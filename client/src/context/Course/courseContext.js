import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAppContext } from '../App/appContext';
import currencyConverter from '../../services/CurrencyConverter';

const initialState = {
  courses: [],
  myCourses: [],
};

// alpha-2 country codes

const countryAbbreviation = {
  Afghanistan: 'AF',
  'Åland Islands': 'AX',
  Albania: 'AL',
  Algeria: 'DZ',
  'American Samoa': 'AS',
  Andorra: 'AD',
  Angola: 'AO',
  Anguilla: 'AI',
  Antarctica: 'AQ',
  'Antigua and Barbuda': 'AG',
  Argentina: 'AR',
  Armenia: 'AM',
  Aruba: 'AW',
  Australia: 'AU',
  Austria: 'AT',
  Azerbaijan: 'AZ',
  Bahamas: 'BS',
  Bahrain: 'BH',
  Bangladesh: 'BD',
  Barbados: 'BB',
  Belarus: 'BY',
  Belgium: 'BE',
  Belize: 'BZ',
  Benin: 'BJ',
  Bermuda: 'BM',
  Bhutan: 'BT',
  Bolivia: 'BO',
  'Bosnia and Herzegovina': 'BA',
  Botswana: 'BW',
  'Bouvet Island': 'BV',
  Brazil: 'BR',
  'British Indian Ocean Territory': 'IO',
  Brunei: 'BN',
  Bulgaria: 'BG',
  'Burkina Faso': 'BF',
  Burundi: 'BI',
  Cambodia: 'KH',
  Cameroon: 'CM',
  Canada: 'CA',
  'Cape Verde': 'CV',
  'Cayman Islands': 'KY',
  'Central African Republic': 'CF',
  Chad: 'TD',
  Chile: 'CL',
  China: 'CN',
  'Christmas Island': 'CX',
  'Cocos (Keeling) Islands': 'CC',
  Colombia: 'CO',
  Comoros: 'KM',
  Congo: 'CG',
  'Congo, the Democratic Republic of the': 'CD',
  'Cook Islands': 'CK',
  'Costa Rica': 'CR',
  "Côte d'Ivoire": 'CI',
  Croatia: 'HR',
  Cuba: 'CU',
  Cyprus: 'CY',
  'Czech Republic': 'CZ',
  Denmark: 'DK',
  Djibouti: 'DJ',
  Dominica: 'DM',
  'Dominican Republic': 'DO',
  Ecuador: 'EC',
  Egypt: 'EG',
  'El Salvador': 'SV',
  'Equatorial Guinea': 'GQ',
  Eritrea: 'ER',
  Estonia: 'EE',
  Ethiopia: 'ET',
  'Falkland Islands (Malvinas)': 'FK',
  'Faroe Islands': 'FO',
  Fiji: 'FJ',
  Finland: 'FI',
  France: 'FR',
  'French Guiana': 'GF',
  'French Polynesia': 'PF',
  'French Southern Territories': 'TF',
  Gabon: 'GA',
  Gambia: 'GM',
  Georgia: 'GE',
  Germany: 'DE',
  Ghana: 'GH',
  Gibraltar: 'GI',
  Greece: 'GR',
  Greenland: 'GL',
  Grenada: 'GD',
  Guadeloupe: 'GP',
  Guam: 'GU',
  Guatemala: 'GT',
  Guernsey: 'GG',
  Guinea: 'GN',
  'Guinea-Bissau': 'GW',
  Guyana: 'GY',
  Haiti: 'HT',
  'Heard Island and McDonald Islands': 'HM',
  'Holy See (Vatican City State)': 'VA',
  Honduras: 'HN',
  'Hong Kong': 'HK',
  Hungary: 'HU',
  Iceland: 'IS',
  India: 'IN',
  Indonesia: 'ID',
  Iran: 'IR',
  Iraq: 'IQ',
  Ireland: 'IE',
};

const CourseContext = React.createContext();

const CourseProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const { token, user } = useAppContext();

  const formMyCourses = (courses) => {
    let tmpCourses = [];
    courses.forEach((course) => {
      const totalInfo = state.courses.find((c) => c._id === course.courseId);
      tmpCourses.push({ ...course, ...totalInfo });
    });
    return tmpCourses;
  };

  useEffect(() => {
    const getAllCourses = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/course');
        const { data } = response;
        const { courses } = data;

        let convertedCourses = courses;

        if (user) {
          const country = countryAbbreviation[user?.country] || 'EG';
          convertedCourses = await Promise.all(
            courses.map(async (course) => {
              const { newPrice, currency } = await currencyConverter(
                country,
                course.price
              );
              let originalPrice = course.price;
              return { ...course, price: newPrice, originalPrice, currency };
            })
          );
        }

        setState({
          ...state,
          courses: convertedCourses,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getAllCourses();
  }, [token, user]);

  useEffect(() => {
    const getMyCourses = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/course?myCourses=true',
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        setState({
          ...state,
          myCourses: formMyCourses(response.data.courses),
        });
      } catch (error) {
        console.warn(error);
      }
    };

    if (token && state.courses.length > 0) {
      getMyCourses();
    }
  }, [state.courses, token, user]);

  const createCourse = async (course) => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/v1/course',
        course,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setState({
        ...state,
        myCourses: [...state.myCourses, response.data.course],
        courses: [...state.courses, response.data.course],
      });

      return response.data.course._id;
    } catch (error) {
      console.log(error);
    }
  };

  const updateCourse = async (courseId, course, type) => {
    const url = `http://localhost:8080/api/v1/course/${courseId}?type=${type}`;

    try {
      const response = await axios.patch(url, course, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    setState({
      ...state,
      myCourses: state.myCourses.map((c) =>
        c._id.toString() === courseId.toString()
          ? {
              ...c,
              ...course,
            }
          : c
      ),
      courses: state.courses.map((c) =>
        c._id.toString() === courseId.toString()
          ? {
              ...c,
              ...course,
            }
          : c
      ),
    });
  };

  const updateCourseProgress = async (courseId, newUpdate) => {
    setState((prevState) => {
      return {
        ...prevState,
        myCourses: [
          ...prevState.myCourses.map((course) =>
            course._id.toString() === courseId.toString()
              ? {
                  ...course,
                  ...newUpdate,
                }
              : course
          ),
        ],
      };
    });

    const user = JSON.parse(localStorage.getItem('user'));
    const courseIndex = user.courses.findIndex(
      (course) => course.courseId.toString() === courseId.toString()
    );
    user.courses[courseIndex] = {
      ...user.courses[courseIndex],
      completedSubtitles: newUpdate.checkedSubtitles,
      completedExams: newUpdate.checkedExams,
      progress: newUpdate.progress,
    };
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <CourseContext.Provider
      value={{
        ...state,
        coursesState: state,
        updateCourseProgress,
        createCourse,
        updateCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

const useCourseContext = () => {
  return useContext(CourseContext);
};

export { useCourseContext, CourseProvider };

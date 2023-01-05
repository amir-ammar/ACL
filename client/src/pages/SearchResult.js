import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Course from '../components/course/CourseComponent';
import FilterField from '../components/FilterField';
import CustomButton from '../components/CustomButton';
import { FaFilter } from 'react-icons/fa';
import { useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import { useCourseContext } from '../context/Course/courseContext';
import { useSearchParams } from 'react-router-dom';
import RatingStars from '../components/RatingStars';

const subjects = [
  'Machine Learning',
  'Deep Learning',
  'Computer Vision',
  'Software Engineering',
  'Computer Science',
  'Data Science',
  'Web Development',
  'Algorithms',
  'Mathematics',
  'Programming',
  'Data Structures',
  'Artificial Intelligence',
  'Operating Systems',
  'Computer Architecture',
  'Databases',
  'Computer Networks',
  'Computer Graphics',
  'Computer Security',
  'Cyber Security',
  'Cloud Computing',
  'Blockchain',
  'Game Development',
  'Mobile Development',
  'Software Testing',
  'Software Design',
  'Internet of Things',
  'Robotics',
  'Computer Hardware',
];

const ratingOptions = [1, 2, 3, 4, 5].map((rate) => {
  return (
    <span
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <RatingStars rate={rate} />
      <p
        style={{
          marginLeft: '0.5rem',
          fontSize: '.8rem',
          fontWeight: '600',
          color: '#A9A9A9',
          marginTop: '1rem',
        }}
      >
        star{rate > 1 ? 's' : ''}
      </p>
    </span>
  );
});

const useStyles = makeStyles((theme) => ({
  body: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  filters: {
    width: '22rem',
    backgroundColor: '#F2F2F2',
  },

  filterSection: {
    marginTop: '15rem',
    width: '27%',
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
  },
  coursesSection: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    marginTop: '12rem',
    marginRight: '1rem',
  },
  results: {
    marginLeft: 'auto',
    marginRight: '1rem',
    fontSize: '1.2rem',
    fontWeight: '600',
    color: '#A9A9A9',
  },

  pages: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '2rem',
  },
}));

function SearchResult() {
  const classes = useStyles();

  const { courses } = useCourseContext();

  const [searchParams, setSearchParams] = useSearchParams();

  const search = (term) => {
    const filteredCourses = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term.toLowerCase()) ||
        course.subject.toLowerCase().includes(term.toLowerCase()) ||
        course.createdBy?.username.toLowerCase().includes(term.toLowerCase())
    );
    console.log(filteredCourses);
    return filteredCourses;
  };

  const [state, setState] = useState({
    filterTopics: [],
    filterPrice: [],
    filterRatings: [],
    filteredCourses: [],
    renderedCourses: [],
  });

  const [page, setPage] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  useEffect(() => {
    let searchResults = search(searchParams.get('query'));
    setState({
      ...state,
      filteredCourses: searchParams.get('query') ? searchResults : [],
      renderedCourses: searchParams.get('query') ? searchResults : [],
    });
  }, [courses, searchParams]);

  const handleFilter = (filter, field) => {
    console.log(filter, field);
    switch (field) {
      case 'Topic': {
        setState(() => {
          let topics = state.filterTopics;
          if (state.filterTopics.includes(filter)) {
            topics = state.filterTopics.filter((topic) => topic !== filter);
          } else {
            topics = [...state.filterTopics, filter];
          }

          const renderedCourses = state.filteredCourses.filter((course) => {
            return checkCourse(
              course,
              topics,
              state.filterPrice,
              state.filterRatings
            );
          });

          return {
            ...state,
            filterTopics: topics,
            renderedCourses,
          };
        });

        break;
      }
      case 'Price': {
        setState(() => {
          let prices = state.filterPrice;
          if (state.filterPrice.includes(filter)) {
            prices = state.filterPrice.filter((price) => price !== filter);
          } else {
            prices = [...state.filterPrice, filter];
          }

          const renderedCourses = state.filteredCourses.filter((course) => {
            return checkCourse(
              course,
              state.filterTopics,
              prices,
              state.filterRatings
            );
          });

          return {
            ...state,
            filterPrice: prices,
            renderedCourses,
          };
        });

        break;
      }

      case 'Rating': {
        setState(() => {
          let ratings = state.filterRatings;
          console.log(ratings);
          if (state.filterRatings.includes(filter)) {
            ratings = state.filterRatings.filter((rating) => rating !== filter);
          } else {
            ratings = [...state.filterRatings, filter];
          }

          const renderedCourses = state.filteredCourses.filter((course) => {
            return checkCourse(
              course,
              state.filterTopics,
              state.filterPrice,
              ratings
            );
          });

          return {
            ...state,
            filterRatings: ratings,
            renderedCourses,
          };
        });

        break;
      }
      default:
        console.log('default');
    }
  };

  const checkCourse = (candidateCourse, topics, prices, ratings) => {
    console.log(topics.length, prices.length, ratings.length);
    let topicFlag =
      topics.length === 0 || topics.includes(candidateCourse.subject)
        ? true
        : false;

    let priceFlag = prices.length === 0;

    prices.forEach((price) => {
      const [min, max] = price.split('-');
      priceFlag =
        priceFlag ||
        (candidateCourse.price >= parseInt(min) &&
          candidateCourse.price <= parseInt(max));
    });

    let ratingFlag = ratings.length === 0;

    ratings.forEach((rating) => {
      ratingFlag = ratingFlag || candidateCourse.rating === parseInt(rating);
    });

    return topicFlag && priceFlag && ratingFlag;
  };

  const getPage = (e) => {
    setPage(e.target.innerText - 1);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginTop: '12vh',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: '600',
          marginTop: '2rem',
          marginLeft: '1rem',
        }}
      >
        {state.filteredCourses.length} results for “{searchParams.get('query')}”
      </h1>
      <div className={classes.body}>
        <section className={`${classes.filterSection}`}>
          <CustomButton
            // text='Filter'
            onClick={() => setShowFilters(!showFilters)}
            icon={<FaFilter />}
          ></CustomButton>
          <div className={`${classes.filters}`}>
            {showFilters && (
              <div>
                <FilterField
                  title='Topic'
                  options={subjects}
                  onFilter={handleFilter}
                />
                <hr className={`${classes.hr}`} />
                <FilterField
                  title='Rating'
                  options={ratingOptions}
                  onFilter={handleFilter}
                />
                <hr />
                <FilterField
                  title='Price'
                  options={[
                    '0 - 10',
                    '10 - 100',
                    '100 - 1000',
                    '1000 - 10000',
                    '10000 - 1000000',
                  ]}
                  onFilter={handleFilter}
                />
              </div>
            )}
          </div>
        </section>
        {state.renderedCourses.length > 0 && (
          <section className={`${classes.coursesSection}`}>
            <p className={`${classes.results}`}>
              {state.renderedCourses.slice(page * 5, (page + 1) * 5).length}{' '}
              results
            </p>
            {state.renderedCourses
              .slice(page * 5, (page + 1) * 5)
              .map((course) => {
                return (
                  <Course
                    key={course._id}
                    title={course.title}
                    subject={course.subject}
                    description={course.summary}
                    instructor={course.createdBy.username}
                    price={course.price}
                    courseId={course._id}
                    currency={course.currency}
                    horizontal={true}
                    rating={course.rating}
                  />
                );
              })}
            <div className={`${classes.pages}`}>
              <Pagination
                count={Math.ceil(state.renderedCourses.length / 5)}
                color='secondary'
                onChange={getPage}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default SearchResult;

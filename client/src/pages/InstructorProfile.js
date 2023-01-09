import { Pagination, Rating } from '@material-ui/lab';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useAppContext } from '../context/App/appContext';
import { useCourseContext } from '../context/Course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import CourseComponent from '../components/course/CourseComponent';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5rem',
    width: '100%',
  },
  aboutMe: {
    marginTop: '2rem',
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontVariant: 'small-caps',
    fontStretch: 'expanded',
  },
}));

function InstructorProfile() {
  const classes = useStyles();
  const [instructor, setInstructor] = React.useState(null);
  const { token } = useAppContext();
  const [loading, setLoading] = React.useState(true);
  const [myCourses, setMyCourses] = React.useState();
  const { courses } = useCourseContext();
  const [page, setPage] = React.useState(0);
  const { instructorId } = useParams();

  useEffect(() => {
    console.log('useEffect instructor profile');
    setLoading(true);
    const fetchInstructor = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/user/${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setInstructor(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchMyCourses = async () => {
      const myCoursesTmp = courses.filter((course) => {
        return course.createdBy._id.toString() === instructorId.toString();
      });
      setMyCourses(myCoursesTmp);
      setLoading(false);
    };

    if (!instructor) {
      fetchInstructor();
    }
    if (courses && courses.length > 0) {
      fetchMyCourses();
    }
  }, [instructorId, courses]);

  return (
    <main>
      <div className={classes.content}>
        {loading && <Loading />}
        {!loading && (
          <>
            <Avatar
              alt={instructor?.username}
              style={{ width: '7rem', height: '7rem', marginBottom: '1rem' }}
            >
              {instructor?.username.slice(0, 2)}
            </Avatar>
            <h2>
              <strong>{instructor?.username}</strong>
            </h2>
            <Rating
              name='half-rating-read'
              value={instructor?.averageRating || 0}
              precision={0.5}
              readOnly
            />
            <div
              style={{
                marginTop: '1rem',
              }}
            >
              <span>{instructor?.email}</span>
              <span>{instructor?.country}</span>
            </div>
            <p className={classes.aboutMe}>About me</p>
            <p
              style={{
                marginBottom: '2rem',
                marginTop: '1rem',
                textAlign: 'center',
              }}
            >
              {instructor?.biography}
            </p>
            <div className={classes.courses}>
              <h2>
                <strong>My Courses</strong>
              </h2>
              {myCourses
                ?.slice(page * 3, Math.min(page * 3 + 3, myCourses.length))
                .map((course) => {
                  return (
                    <CourseComponent
                      key={course?._id}
                      title={course?.title}
                      subject={course?.subject}
                      price={course?.price}
                      currency={course?.currency}
                      description={course?.summary}
                      previewLink={course?.previewLink}
                      numberOfHours={course?.numberOfHours}
                      rating={course?.rating}
                      instructor={course?.createdBy.username}
                      courseId={course?._id}
                      horizontal={true}
                    />
                  );
                })}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Pagination
                  count={Math.ceil(myCourses?.length / 3)}
                  color='primary'
                  size='large'
                  showFirstButton
                  showLastButton
                  onChange={(e, value) => setPage(value - 1)}
                />
              </div>
            </div>
          </>
        )}
      </div>
      <Footer></Footer>
    </main>
  );
}

export default InstructorProfile;

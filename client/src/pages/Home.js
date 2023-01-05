import React, { useEffect, useState } from 'react';
import { CourseComponent, Courses, Loading, PageHeader } from '../components';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { useCourseContext } from '../context/Course/courseContext';
import { useAppContext } from '../context/App/appContext';
import { Pagination } from '@material-ui/lab';
import motivationalImage from '../assets/images/motivational.jpg';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  main: {
    height: '100%',
    width: '100%',
    marginTop: '4rem',
  },
  courses: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '68%',
    marginLeft: '1rem',
    marginTop: '1rem',
  },
  motivation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: '20%',
      height: '20%',
      objectFit: 'cover',
      marginRight: '1rem',
      borderRadius: '10%',
    },
    '& h1': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333',
    },
    width: '68%',
    borderRadius: '10px',
    padding: '1rem',
    margin: '1rem',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f5f5f5',
    // on hover animation effect on the card
    '&:hover': {
      transform: 'translateY(-5px)',
      transition: 'all 0.3s ease-in-out',
    },
  },

  topRated: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    marginLeft: '1rem',
    marginTop: '1rem',
  },

  topRatedCourses: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: '1rem',
    marginTop: '1rem',
    overflowX: 'auto',
  },
  dottedLine: {
    width: '100%',
    height: '1px',
    backgroundColor: '#333',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  ourPartners: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '5rem',
    marginBottom: '5rem',
    '&:hover': {
      transform: 'translateY(-5px)',
      transition: 'all 0.3s ease-in-out',
    },
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    backgroundColor: '#f5f5f5',
  },
  course: {},
}));

function EmptyCard() {
  const classes = useStyles();
  return (
    <div className={classes.motivation}>
      <img src={motivationalImage} alt='empty in progress' />
      <h1>We believe in you! and your skills. so let's get started</h1>
    </div>
  );
}

function CenteredTabs({ changeTab }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const { user, token } = useAppContext();

  console.log("user",user);
  const handleChange = (event, newValue) => {
    changeTab(newValue);
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor='primary'
        textColor='primary'
        centered
      >
        <Tab label='Home' />
        {token &&
          user &&
          (user.type === 'Individual trainee' ||
            user.type === 'Corporate trainee') && <Tab label='In Progress' />}
        {token &&
          user &&
          (user.type === 'Individual trainee' ||
            user.type === 'Corporate trainee') && <Tab label='Completed' />}
        {token && user && user.type === 'Instructor' && (
          <Tab label='My Courses' />
        )}
      </Tabs>
    </Paper>
  );
}

const Home = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const {user,token} = useAppContext();
  const [tab, setTab] = useState(0);
  const { courses, myCourses } = useCourseContext();
  const [sortedCourses, setSortedCourses] = useState();
  const [inProgress, setInprogress] = useState();
  const [completed, setCompleted] = useState();
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    setLoading(true);
    if (myCourses && courses && courses.length > 0) {
      const inprogress = myCourses.filter((course) => {
        return course.progress !== 100;
      });
      const completed = myCourses.filter((course) => course.progress === 100);
      courses.sort((a, b) => {
        return b.rating - a.rating;
      });
      setSortedCourses(courses);
      setInprogress(inprogress);
      setCompleted(completed);
      if (completed && inprogress && courses) {
        setLoading(false);
      }
    }
  }, [myCourses, courses]);

  return (
    <>
      {loading && <Loading />}
      {!loading && (
        <main className={`${classes.main}`}>
          <PageHeader />
          <CenteredTabs changeTab={(tab) => setTab(tab)} />
          <div className={classes.courses}>
            {tab === 0 && <Courses courses={courses} page={page} />}
            {tab === 1 &&
              inProgress
                .slice(3 * page, Math.min(3 * page + 3, inProgress.length))
                .map((course) => {
                  return (
                    <CourseComponent
                      key={course?._id}
                      title={course?.title}
                      subject={course?.subject}
                      description={course?.summary}
                      instructor={course?.createdBy.username}
                      courseId={course?._id}
                      horizontal={true}
                      rating={course?.rating}
                      progress={course?.progress}
                      demo={false}
                    />
                  );
                })}
            {tab === 2 &&
              completed
                .slice(3 * page, Math.min(3 * page + 3, completed.length))
                .map((course) => {
                  return (
                    <CourseComponent
                      key={course?._id}
                      title={course?.title}
                      subject={course?.subject}
                      description={course?.summary}
                      instructor={course?.createdBy.username}
                      courseId={course?._id}
                      horizontal={true}
                      rating={course?.rating}
                      progress={course?.progress}
                      demo={false}
                      currency={course?.currency}
                    />
                  );
                })}
          </div>
          {(tab === 0 && courses.length !== 0) ||
          (tab === 1 && inProgress.length !== 0) ||
          (tab === 2 && completed.length !== 0) ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                marginTop: '2rem',
              }}
            >
              <Pagination
                count={
                  tab === 0
                    ? Math.ceil(courses.length / 3)
                    : tab === 1
                    ? Math.ceil(inProgress.length / 3)
                    : Math.ceil(completed.length / 3)
                }
                onChange={(e, value) => setPage(value - 1)}
                color='primary'
              />
            </div>
          ) : (
            <EmptyCard />
          )}
          <div className={classes.dottedLine}></div>
          <div className={classes.ourPartners}>
            <h3>
              Top companies offer our courses to their employees to develop
              their skills
            </h3>
            <p>
              These courses were selected for our collection of top-rated
              courses trusted by businesses worldwide.
            </p>
            <div className={classes.ourPartnersItems}>
              <img
                alt='Nasdaq'
                height='38'
                width='115'
                src='https://s.udemycdn.com/partner-logos/v4/nasdaq-dark.svg'
              />

              <img
                alt='Box'
                height='38'
                width='67'
                src='https://s.udemycdn.com/partner-logos/v4/box-dark.svg'
              />
              <img
                alt='Eventbrite'
                height='38'
                width='115'
                src='https://s.udemycdn.com/partner-logos/v4/eventbrite-dark.svg'
              ></img>
              <img
                alt='NetApp'
                height='38'
                width='115'
                src='https://s.udemycdn.com/partner-logos/v4/netapp-dark.svg'
              />
            </div>
          </div>
          <div className={classes.topRated}>
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#333',
                marginLeft: '1rem',
              }}
            >
              Top Rated Courses
            </h2>
            <div className={classes.topRatedCourses}>
              {sortedCourses
                .slice(0, Math.min(9, courses.length))
                .map((course) => {
                  return (
                    <CourseComponent
                      key={course?._id}
                      title={course?.title}
                      description={course?.summary}
                      rating={course?.rating}
                      image={course?.image}
                      price={course?.price}
                      courseId={course?._id}
                      horizontal={false}
                      subject={course?.subject}
                      currency={course?.currency}
                      numOfHours={course?.numOfHours}
                    />
                  );
                })}
            </div>
          </div>

          <br />
          <br />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Home;

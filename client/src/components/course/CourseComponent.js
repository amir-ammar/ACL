import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useNavigate } from 'react-router-dom';
import LinearProgressBar from '../LinearProgressBar';
import { useRef, useState } from 'react';
import {
  AiOutlineCheck,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import { FaStar } from 'react-icons/fa';
import RatingStars from '../RatingStars';
import { Box } from '@material-ui/core';
import { useAppContext } from '../../context/App/appContext';

const useStyles = makeStyles((theme) => ({
  img: {
    width: 128,
    height: 128,
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  root: {
    padding: '1rem',
    boxShadow: '0 0 10px rgba(.5,.5,.5,0.1)',
    marginBottom: '1rem',
    width: '100%',
  },

  course: {
    minWidth: '17rem',
    maxWidth: '17rem',
    minHeight: '17rem',
    maxHeight: '22rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(.5,.5,.5,0.1)',
    paddingBottom: '2rem',
    overflow: 'hidden',
    marginRight: '1rem',
  },

  core: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  imgVertical: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'cover',
  },
  description: {
    minHeight: '3rem',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
  },

  demo: {
    position: 'absolute',
    width: '25rem',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem',
    backgroundColor: 'rgb(220, 218, 215)',
    boxShadow: '0 0 10px rgba(.5,.5,.5,0.1)',
    zIndex: 100,
  },

  demoHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: '2rem',
    marginTop: '1rem',
    fontSize: '0.8rem',
    fontWeight: '400',
  },

  willLearn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    margin: '1rem 0',
  },

  addToCartBtn: {
    width: '17rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(45, 49, 51)',
    color: '#fff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    border: 'none',
    outline: 'none',
    '&:hover': {
      backgroundColor: 'rgb(0, 0, 0)',
    },
  },

  likeBtn: {
    width: '2.5rem',
    height: '2.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
  },

  demoFooter: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
  },
}));

function Demo({
  numOfHours,
  numOfVideos,
  numOfStudents,
  title,
  description,
  price,
  instructor,
  subject,
  style,
  courseId,
}) {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <>
      <div className={classes.demo}>
        <Typography variant='h5' component='h2'>
          {title && title}
        </Typography>
        <div className={classes.demoHeader}>
          <p style={{ marginRight: '1rem' }}>5 Videos</p>
          <p style={{ marginRight: '1rem' }}>10 Hours</p>
          <p>1000 Students</p>
        </div>
        <Typography>{description && description.slice(0, 100)}</Typography>
        <div className={classes.willLearn}>
          <Typography variant='h6'>What you'll learn</Typography>
          <div
            style={{
              padding: '0.5rem',
            }}
          >
            <div>
              <AiOutlineCheck /> Learn React.js
            </div>
            <div>
              <AiOutlineCheck /> Learn Redux
            </div>
            <div>
              <AiOutlineCheck /> Learn React Hooks
            </div>
            <div>
              <AiOutlineCheck /> Learn React Router
            </div>
          </div>
        </div>
        <div className={classes.demoFooter}>
          <button
            className={classes.addToCartBtn}
            onClick={() => navigate(`/course/${courseId}`)}
          >
            Go to course <AiOutlineShoppingCart />
          </button>
        </div>
      </div>
    </>
  );
}

function CourseComponent({
  title,
  description,
  image,
  price,
  rating,
  instructor,
  courseId,
  progress,
  subject,
  horizontal,
  numOfVideos,
  numOfHours,
  numberOfStudents,
  demo,
  currency,
}) {
  const classes = useStyles();
  const [showDemo, setShowDemo] = useState(false);
  const courseRef = useRef();
  const navigate = useNavigate();
  const { user } = useAppContext();

  return (
    <>
      {horizontal && (
        <div className={`${classes.root}`} ref={courseRef}>
          <Box
            style={{
              textDecoration: 'none',
              color: 'black',
              cursor: 'pointer',
            }}
            onMouseEnter={() => {
              setShowDemo(true);
            }}
            onMouseLeave={() => setShowDemo(false)}
          >
            <Grid container spacing={2}>
              <Grid item onClick={() => navigate(`/course/${courseId}`)}>
                <img
                  className={classes.img}
                  alt='complex'
                  src='https://www.patterns.dev/img/reactjs/react-logo@3x.svg'
                />
              </Grid>

              <Grid item xs={5} sm container>
                <Grid item xs container direction='column' spacing={2}>
                  <Grid item xs>
                    <div onClick={() => navigate(`/course/${courseId}`)}>
                      <Typography gutterBottom style={{ fontWeight: 'bold' }}>
                        {title && title}
                      </Typography>
                      <Typography variant='body2' gutterBottom>
                        {description && description.slice(0, 100)}
                      </Typography>
                      <Typography gutterBottom variant='body2'>
                        {instructor && instructor}
                      </Typography>
                      <Typography variant='body2' color='textSecondary'>
                        {subject && subject}
                      </Typography>
                    </div>
                    {progress && (
                      <div
                        style={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                        }}
                      >
                        <LinearProgressBar value={progress} />
                        <Typography
                          gutterBottom
                          style={{ fontWeight: '300' }}
                          variant='caption'
                        >
                          {progress}% Completed
                        </Typography>
                      </div>
                    )}

                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <RatingStars rate={rating} />
                      {progress === 100 && (
                        <Typography
                          variant='body2'
                          color='textSecondary'
                          style={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                          }}
                          onClick={() =>
                            navigate(
                              `/certificate?username=${user.username}&course=${title}`
                            )
                          }
                        >
                          Download Certificate
                        </Typography>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography variant='body2' color='textSecondary'>
                    {price && price}
                    {currency && currency}
                    {!currency && price && ' $'}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <div
              style={{
                position: 'absolute',
                top: courseRef.current?.offsetTop,
                left: Number(
                  courseRef.current?.offsetLeft +
                    courseRef.current?.offsetWidth +
                    400 >=
                    document.body.clientWidth
                    ? courseRef.current?.offsetLeft - 400
                    : courseRef.current?.offsetLeft +
                        courseRef.current?.offsetWidth
                )
                  ? Number(
                      courseRef.current?.offsetLeft +
                        courseRef.current?.offsetWidth +
                        400 >=
                        document.body.clientWidth
                        ? courseRef.current?.offsetLeft - 400
                        : courseRef.current?.offsetLeft +
                            courseRef.current?.offsetWidth
                    )
                  : 0,
              }}
            >
              {demo && showDemo && (
                <Demo
                  title={title}
                  description={description}
                  image={image}
                  price={price}
                  instructor={instructor}
                  subject={subject}
                  numOfVideos={numOfVideos}
                  numOfHours={numOfHours}
                  numberOfStudents={numberOfStudents}
                  courseId={courseId}
                />
              )}
            </div>
          </Box>
        </div>
      )}
      {!horizontal && (
        <div className={`${classes.course}`}>
          <Link
            to={`/course/${courseId}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <img
              className={classes.imgVertical}
              alt='complex'
              src='https://www.patterns.dev/img/reactjs/react-logo@3x.svg'
            />
            <div className={`${classes.core}`}>
              <Typography gutterBottom style={{ fontWeight: 'bold' }}>
                {title && title}
              </Typography>
              <Typography variant='body2' gutterBottom>
                {instructor && instructor}
              </Typography>
              <Typography gutterBottom variant='body2'>
                {subject && subject}
              </Typography>
              <Typography
                variant='body2'
                color='textSecondary'
                className={`${classes.description}`}
              >
                {(description && description.slice(0, 50)) ||
                  'Course Description'}
              </Typography>
              {price && (
                <Typography variant='subtitle1'>
                  {price && price}
                  {currency && currency}
                  {!currency && price && ' $'}
                </Typography>
              )}
              {progress && (
                <div
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <LinearProgressBar valueOfProgress={progress} />
                  <Typography
                    gutterBottom
                    style={{ fontWeight: '300' }}
                    variant='caption'
                  >
                    {progress}% Completed
                  </Typography>
                </div>
              )}
            </div>
          </Link>
          {showDemo && (
            <Demo
              title={title}
              description={description}
              image={image}
              price={price}
              instructor={instructor}
              subject={subject}
              numOfVideos={numOfVideos}
              numOfHours={numOfHours}
              currency={currency}
              numberOfStudents={numberOfStudents}
              courseId={courseId}
            />
          )}
        </div>
      )}
    </>
  );
}

export default CourseComponent;

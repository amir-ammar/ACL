import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import axios from 'axios';
import { useAppContext } from '../context/App/appContext';
import Loading from './Loading';
import { Link, useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    width: '50%',
    backgroundColor: '#f5f5f5',
    borderRadius: '0.5rem',
    marginBottom: '1rem',
    marginTop: '1rem',
  },

  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '1rem',
    padding: '1rem',
    borderRadius: '0.5rem',
  },

  icons: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: '1rem',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },

  icon: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    color: '#777',
  },

  p: {
    marginTop: '0.8rem',
    marginLeft: '0.5rem',
  },

  footer: {
    padding: '1rem',
    borderRadius: '0.5rem',
  },
}));

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};

function InstructorRating({ instructorId, type }) {
  const classes = useStyles();
  const { token, user } = useAppContext();
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(() => true);
  const [open, setOpen] = useState(() => false);
  const [rating, setRating] = useState(() => 0);
  const navigate = useNavigate();
  const [ratedByCurrentUser, setRatedByCurrentUser] = useState(() => false);

  useEffect(() => {
    console.log('Instructor Rating useEffect');
    if (instructorId === undefined) return;
    setLoading(true);
    const fetchInstructorRating = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/user/${instructorId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        setInstructor(res.data);

        if (res.data.ratings) {
          const rating = res.data.ratings.find(
            (rating) => rating.user === user._id
          );
          if (rating) {
            setRatedByCurrentUser(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    const checkIfRatedByCurrentUser = () => {
      if (instructor.ratings) {
        const rating = instructor.ratings.find(
          (rating) => rating.user === user._id
        );
        if (rating) {
          setRatedByCurrentUser(true);
        }
      }
    };

    if (!instructor) fetchInstructorRating();
    else checkIfRatedByCurrentUser();

    setLoading(false);
  }, [instructorId, token, user]);

  const postRating = async (rating) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        'http://localhost:8080/api/v1/user/',
        { rating, instructorId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data);
      setInstructor(res.data);
      setRatedByCurrentUser(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <main className={classes.main}>
      {loading && <Loading />}
      <header
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          padding: '0.5rem',
          borderRadius: '0.5rem',
        }}
      >
        <h1
          style={{
            // make it a link to instructor profile
            fontSize: '1.2rem',
            fontWeight: '500',
            marginLeft: '1rem',
            cursor: 'pointer',
            textDecoration: 'none',
            color: '#333',
          }}
          onClick={() => navigate(`/instructor/${instructor?._id}`)}
        >
          {!loading && instructor?.username}
        </h1>
      </header>
      <Divider />
      <div className={classes.content}>
        <Avatar
          style={{
            width: '5rem',
            height: '5rem',
            fontSize: '1.5rem',
            fontWeight: '500',
          }}
        >
          <Link
            to={`/instructor/${instructor?._id}`}
            style={{ textDecoration: 'none', color: '#333' }}
          >
            {instructor?.username?.substring(0, 2).toUpperCase()}
          </Link>
        </Avatar>
        <div className={classes.icons}>
          <div className={classes.icon}>
            <i className='fas fa-star'></i>
            <p className={classes.p}>
              {!loading && instructor?.averageRating} instructor rating
            </p>
          </div>
          <div className={classes.icon}>
            <i className='fas fa-user'></i>
            <p className={classes.p}>
              {!loading && instructor?.ratings?.length} Reviewers
            </p>
          </div>
          <div className={classes.icon}>
            <i className='fas fa-book'></i>
            <p className={classes.p}>
              {!loading && instructor?.courses?.length} Courses
            </p>
          </div>
          <div>
            {type === 'enrolled' && !ratedByCurrentUser && (
              <span
                onClick={() => setOpen(true)}
                style={{
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  margin: '0',
                  padding: '0',
                  color: '#007bff',
                }}
              >
                Rate Instructor
              </span>
            )}
          </div>
        </div>

        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          aria-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Rate Instructor</DialogTitle>
          <DialogContent>
            <Rating
              name='customized-icons'
              defaultValue={1}
              IconContainerComponent={IconContainer}
              onChange={(event, newValue) => setRating(newValue)}
              style={{
                marginRight: '1rem',
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color='primary'>
              Cancel
            </Button>
            <Button
              onClick={() => {
                postRating(rating);
                setOpen(false);
              }}
              color='primary'
            >
              Rate
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Divider />
      <footer className={classes.footer}>
        <p>{!loading && instructor?.biography}</p>
      </footer>
    </main>
  );
}

export default InstructorRating;

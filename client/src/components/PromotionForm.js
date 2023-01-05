import React, { useEffect, useRef, useState } from 'react';
import { useCourseContext } from '../context/Course/courseContext';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { FormControl, Select } from '@material-ui/core';
import SnackBar from './SnackBar';
import { useAppContext } from '../context/App/appContext';
import Loading from './Loading';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '60vw',
    margin: '7rem 20rem',
    backgroundColor: '#cccccc',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
  },
  form: {
    padding: '3rem 3rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    paddingTop: '2rem',
  },
  select: {
    width: '15rem',
    height: '2.4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '1rem',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  line: {
    width: '100%',
    height: '1px',
    backgroundColor: 'black',
    margin: '1rem 0',
  },
  subtitleTitle: {
    textAlign: 'center',
  },

  alert: {
    display: 'absolute',
    marginTop: '1rem',
  },
  addCourseButton: {
    width: '20rem',
    margin: '.5rem auto',
    display: 'block',
  },
  addSubtitleButton: {
    width: '20rem',
    margin: '.5rem auto',
    display: 'block',
    backgroundColor: '#3f51b5',
  },
  removeSubtitleButton: {
    width: '20rem',
    margin: '.5rem auto',
    display: 'block',
    backgroundColor: '#f44336',
  },

  choice: {
    width: '30rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '1rem',
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#d5d5d5',
      scale: 1.05,
      transition: 'all 0.5s ease-in-out',
    },
  },

  question: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1rem 0',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '1rem',
    backgroundColor: '#f5f5f5',
  },
}));

function PromotionForm({ submitted }) {
  const classes = useStyles();
  const [alert, setAlert] = useState(null);
  const startDateRef = useRef();
  const endDateRef = useRef();
  const promotionPercentageRef = useRef();
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const { updateCourse } = useCourseContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const promotionPercentage = promotionPercentageRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;

    if (!startDate || !endDate || !promotionPercentage) {
      setAlert('Please fill in all the fields');
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    if (promotionPercentage < 0 || promotionPercentage > 100) {
      setAlert('Promotion percentage must be between 0 and 100');
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    if (startDate > endDate) {
      setAlert('Start date must be before end date');
      setTimeout(() => {
        setAlert(null);
      }, 3000);
      return;
    }

    setLoading(true);
    setAlert('Promotion code added successfully');

    updateCourse(
      courseId,
      {
        promotion: {
          promotionPercentage,
          startDate,
          endDate,
        },
      },
      'promotion'
    );

    setTimeout(() => {
      setAlert(null);
      submitted();
    }, 3000);

    setLoading(false);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={`${classes.container}`}>
          <h1 className={`${classes.title}`}>Add Promotion</h1>
          {loading && <Loading type='spin' color='white' />}
          {alert && <SnackBar content={alert} />}
          <Form className={`${classes.form}`} onSubmit={handleSubmit}>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridNumberOfHours'>
                <Form.Label>Promotion Percentage</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter promotion percentage'
                  ref={promotionPercentageRef}
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridPrice'>
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Enter course start date'
                  ref={startDateRef}
                />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridNumberOfHours'>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Enter course end date'
                  ref={endDateRef}
                />
              </Form.Group>
            </Row>

            <Button
              variant='primary'
              type='submit'
              className={`${classes.addCourseButton}`}
              id='addCourseButton'
            >
              Add Promotion Code
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PromotionForm;

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/App/appContext';
import { useState } from 'react';
import { useRef } from 'react';
import Loading from './Loading';
import { useCourseContext } from '../context/Course/courseContext';

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

function ExamForm({ submitted }) {
  const classes = useStyles();

  const { courseId } = useParams();
  const [questions, setQuestions] = useState(0);
  const [disableAddExamButton, setDisableAddExamButton] = useState(true);
  const addExamButtonRef = useRef();
  const [loading, setLoading] = useState(false);
  const hoursRef = useRef();
  const minutesRef = useRef();
  const secondsRef = useRef();
  const questionsRef = useRef();
  const [alert, setAlert] = useState(null);

  const setAlertFunc = (type, message) => {
    setAlert({ type, message });
  };

  const clearAlert = () => {
    setAlert(null);
  };

  const addQuestion = () => {
    setDisableAddExamButton(false);
    setQuestions(questions + 1);
  };

  const removeQuestion = () => {
    if (questions === 1) setDisableAddExamButton(true);
    setQuestions(questions - 1);
  };

  const setError = () => {
    setAlertFunc('error', "Exam's not been created successfully");
    setTimeout(() => {
      clearAlert();
    }, 3000);
  };

  const getExamData = async (e) => {
    const exam = {};
    exam['duration'] = {
      hours: hoursRef.current.value,
      minutes: minutesRef.current.value,
      seconds: secondsRef.current.value,
    };

    if (
      exam['duration']['hours'] === '' ||
      exam['duration']['minutes'] === '' ||
      exam['duration']['seconds'] === ''
    ) {
      setError();
      return;
    }

    const questions = [];
    for (let i = 0; i < questionsRef.current.children.length; i++) {
      let question = {};
      let answer = -1;
      question['title'] =
        questionsRef.current.children[i].children[1].children[1].value;

      if (question['title'] === '') {
        setError();
        return;
      }

      let choices = questionsRef.current.children[i].children[2];
      let choicesArray = [];
      for (let i = 0; i < 4; i++) {
        let row = choices.children[i];

        if (row.children[0].children[0].children[1].value === '') {
          setError();
          return;
        }

        choicesArray.push(row.children[0].children[0].children[1].value);
        answer = row.children[0].children[0].children[2].children[0].checked
          ? i
          : answer;
      }
      question['choices'] = choicesArray;
      question['answer'] = answer;
      questions.push(question);

      if (answer === -1) {
        setError();
        return;
      }
    }
    exam['questions'] = questions;
    exam['courseId'] = courseId;
    return exam;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const exam = await getExamData();

    if (exam) {
      try {
        const res = await axios.post(
          'http://localhost:8080/api/v1/exam',
          exam,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log(res);
        setAlertFunc('success', "Exam's been created successfully");
        setTimeout(() => {
          clearAlert();
          submitted();
        }, 3000);
      } catch (error) {
        setAlertFunc('error', "Exam's not been created successfully");
        setTimeout(() => {
          clearAlert();
          submitted();
        }, 3000);
      }
      setLoading(false);
    }
  };

  return (
    <div className={`${classes.container}`}>
      <h1 className={`${classes.title}`}>Create Exam</h1>

      {loading && <Loading></Loading>}
      {alert && (
        <Alert variant='filled' severity={alert?.type} sx={{ width: 20 }}>
          {alert?.message}
        </Alert>
      )}
      <Form className={`${classes.form}`} onSubmit={handleSubmit}>
        <Row className='mb-3'>
          <Form.Group as={Col} controlId='formGridNumberOfHours' id='hours'>
            <Form.Label>Hours</Form.Label>
            <Form.Control type='number' placeholder='Hours' ref={hoursRef} />
          </Form.Group>

          <Form.Group as={Col} controlId='formGridPromotion' id='minutes'>
            <Form.Label>Minutes</Form.Label>
            <Form.Control
              type='number'
              placeholder='Minutes'
              ref={minutesRef}
            />
          </Form.Group>
          <Form.Group
            as={Col}
            controlId='formGridPromotionDuration'
            id='seconds'
          >
            <Form.Label>Seconds</Form.Label>
            <Form.Control
              type='number'
              placeholder='seconds'
              ref={secondsRef}
            />
          </Form.Group>
        </Row>

        {questions > 0 && (
          <div className={`${classes.subtitles}`}>
            <div className={`${classes.line}`}></div>
            <h3 className={`${classes.subtitleTitle}`}>Questions</h3>
            <div ref={questionsRef}>
              {[...Array(questions)].map((e, i) => {
                return (
                  <div className={`${classes.question}`} key={i}>
                    <h3>Question {i + 1}</h3>
                    <Form.Group
                      className='mb-3'
                      style={{
                        width: '30rem',
                      }}
                    >
                      <Form.Label>Title</Form.Label>
                      <Form.Control placeholder='Title' id='title' />
                    </Form.Group>
                    <div>
                      {[...Array(4)].map((e, i) => {
                        return (
                          <Row className='mb-3' key={i}>
                            <Form.Group
                              as={Col}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <div className={classes.choice}>
                                <Form.Label>choice {i + 1}</Form.Label>
                                <Form.Control
                                  type='text'
                                  placeholder='Put the choice here'
                                />
                                <Form.Check
                                  type='checkbox'
                                  label='Check the box if this is the correct answer'
                                  style={{ marginTop: '1rem' }}
                                />
                              </div>
                            </Form.Group>
                          </Row>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className={`${classes.buttons}`}>
          <Button
            variant='secondary'
            onClick={addQuestion}
            className={`${classes.addSubtitleButton}`}
          >
            Add Question
          </Button>
          {questions > 0 && (
            <Button
              variant='secondary'
              className={`${classes.removeSubtitleButton}`}
              onClick={removeQuestion}
            >
              Remove Question
            </Button>
          )}
        </div>
        <Button
          variant='primary'
          type='submit'
          className={`${classes.addCourseButton}`}
          ref={addExamButtonRef}
          id='addCourseButton'
          disabled={disableAddExamButton}
        >
          Add Exam
        </Button>
      </Form>
    </div>
  );
}

export default ExamForm;

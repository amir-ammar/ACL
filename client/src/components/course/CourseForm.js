import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppContext } from '../../context/App/appContext';
import { useCourseContext } from '../../context/Course/courseContext';
import { FormControl, Select } from '@material-ui/core';
import { useState } from 'react';
import { useRef } from 'react';
import Footer from '../Footer';
import Loading from '../Loading';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  main: {
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
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
}));

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

function CourseForm({ addCourseFront }) {
  const classes = useStyles();

  const { courseId } = useParams();
  const { alert, setAlert, clearAlert, alertText, alertType } = useAppContext();
  const { createCourse, updateCourse } = useCourseContext();
  const [subtitles, setSubtitles] = useState(0);
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const subtitlesRef = useRef();
  const navigate = useNavigate();

  const addSubtitle = () => {
    setDisable(false);
    setSubtitles(subtitles + 1);
  };

  const removeSubtitle = () => {
    if (subtitles === 1) setDisable(true);
    setSubtitles(subtitles - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(e.target[0].value);
    const title = e.target[0].value;
    const subject = e.target[1].value;
    const price = e.target[2].value;
    const numberOfHours = e.target[3].value;
    const promotion = e.target[4].value;
    const previewLink = e.target[5].value;
    const summary = e.target[6].value;

    const course = {
      title,
      subject,
      price,
      numberOfHours,
      promotion,
      previewLink,
      summary,
    };

    if (!title || !subject || !price || !numberOfHours || !summary) {
      setAlert('error', 'Please fill all the fields');
      clearAlert();
      setLoading(false);
      return;
    }

    let id = '';
    try {
      if (courseId) {
        await updateCourse(courseId, course);
      } else {
        id = await createCourse(course);
      }
      if (addCourseFront) {
        addCourseFront(course);
      }
      setAlert('success', `${title} Course Created successfully`);
      clearAlert();
    } catch (error) {
      console.log('error' + error);
      const { msg } = error.response.data;

      console.log(error.response.data.msg);

      setAlert('error', msg);

      clearAlert();
    }

    if (id) {
      let subtitlesContent = [];
      for (let i = 0; i < subtitles; i++) {
        const title =
          subtitlesRef.current.children[i + 2].children[1].children[1].value;
        const link =
          subtitlesRef.current.children[i + 2].children[2].children[0]
            .children[1].value;
        const duration =
          subtitlesRef.current.children[i + 2].children[2].children[1]
            .children[1].value;

        const description =
          subtitlesRef.current.children[i + 2].children[3].children[1].value;

        if (!title || !link || !duration || !description) {
          setAlert('error', 'Please fill all fields');
          clearAlert();
          setLoading(false);
          return;
        }

        subtitlesContent.push({
          title,
          link,
          duration,
          description,
        });
      }

      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/course/${id}/subtitle`,
          subtitlesContent,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        console.log(response);
        navigate('/profile');
      } catch (error) {
        console.log(error);
      }
    } else {
      setAlert(
        'error',
        'Choose a different title as this one is already taken'
      );
      clearAlert();
    }

    setLoading(false);
  };

  return (
    <main className={classes.main}>
      {loading && <Loading></Loading>}

      <div className={`${classes.container}`}>
        <h1 className={`${classes.title}`}>
          {courseId ? 'Update' : 'Add'} Course
        </h1>

        {alert && (
          <Alert variant='filled' severity={alertType} sx={{ width: 20 }}>
            {alertText}
          </Alert>
        )}
        <Form className={`${classes.form}`} onSubmit={handleSubmit}>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridTitle'>
              <Form.Label>Title</Form.Label>
              <Form.Control type='text' placeholder='Enter course title' />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridSubject'>
              <FormControl variant='filled' className={classes.formControl}>
                <Form.Label>Subject</Form.Label>

                <Select
                  native
                  inputProps={{
                    name: 'age',
                    id: 'subject',
                  }}
                  className={classes.select}
                >
                  <option aria-label='None' value='' />
                  {subjects.map((subject, i) => (
                    <option value={subject} key={i}>
                      {subject}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Form.Group>
          </Row>
          <Row className='mb-3'>
            <Form.Group as={Col} controlId='formGridPrice'>
              <Form.Label>Price</Form.Label>
              <Form.Control type='number' placeholder='Enter course price' />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridNumberOfHours'>
              <Form.Label>Number Of Hours</Form.Label>
              <Form.Control type='number' placeholder='Number Of Hours' />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPromotion'>
              <Form.Label>Promotion</Form.Label>
              <Form.Control type='number' placeholder='Promotion' />
            </Form.Group>
          </Row>
          <Form.Group className='mb-3' controlId='formGridPreviewLink'>
            <Form.Label>Preview Link</Form.Label>
            <Form.Control placeholder='Preview Link' />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGridSummary'>
            <Form.Label>Summary</Form.Label>
            <Form.Control as='textarea' placeholder='Summary' />
          </Form.Group>

          {subtitles > 0 && (
            <div className={`${classes.subtitles}`} ref={subtitlesRef}>
              <div className={`${classes.line}`}></div>
              <h3 className={`${classes.subtitleTitle}`}>Subtitles</h3>
              {[...Array(subtitles)].map((e, i) => {
                return (
                  <div className={`${classes.subtitle}`} key={i}>
                    <h4>Subtitle {i + 1}</h4>
                    <Form.Group className='mb-3' controlId='formGridTitle'>
                      <Form.Label>Title</Form.Label>
                      <Form.Control placeholder='Title' />
                    </Form.Group>

                    <Row className='mb-3'>
                      <Form.Group as={Col} controlId='formGridLink'>
                        <Form.Label>Link</Form.Label>
                        <Form.Control type='text' placeholder='Link' />
                      </Form.Group>

                      <Form.Group as={Col} controlId='formGridDuration'>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control type='number' placeholder='Duration' />
                      </Form.Group>
                    </Row>

                    <Form.Group
                      className='mb-3'
                      controlId='formGridDescription'
                    >
                      <Form.Label>Description</Form.Label>
                      <Form.Control as='textarea' placeholder='Description' />
                    </Form.Group>
                  </div>
                );
              })}
            </div>
          )}

          <div className={`${classes.buttons}`}>
            <Button
              variant='secondary'
              onClick={addSubtitle}
              className={`${classes.addSubtitleButton}`}
            >
              Add Subtitle
            </Button>
            {subtitles > 0 && (
              <Button
                variant='secondary'
                className={`${classes.removeSubtitleButton}`}
                onClick={removeSubtitle}
              >
                Remove Subtitle
              </Button>
            )}
          </div>
          <Button
            variant='primary'
            type='submit'
            className={`${classes.addCourseButton}`}
            id='addCourseButton'
            disabled={disable}
          >
            Add Course
          </Button>
        </Form>
      </div>
      <Footer />
    </main>
  );
}

export default CourseForm;

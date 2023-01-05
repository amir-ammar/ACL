import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/App/appContext';
import { Alert } from '@material-ui/lab';
import Loading from '../Loading';

const useStyles = makeStyles((theme) => ({
  container: {
    width: '60vw',
    margin: '7vh 20vw',
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
  btns: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
  },

  ARBtns: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

function SubTitle() {
  return (
    <div>
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

      <Form.Group className='mb-3' controlId='formGridDescription'>
        <Form.Label>Description</Form.Label>
        <Form.Control as='textarea' placeholder='Description' />
      </Form.Group>
    </div>
  );
}

function SubtitleForm({ callBack, submitted }) {
  const classes = useStyles();
  const [subtitles, setSubtitles] = useState(0);
  const { courseId } = useParams();
  const [loading, setLoading] = useState(false);
  const { alert, alertType, alertText, setAlert, clearAlert } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const numOfQuestions = e.target[0].value;
    if (subtitles === 0) setSubtitles(parseInt(numOfQuestions));
    else {
      let subTitle = [];
      for (let i = 0; i < subtitles; i++) {
        console.log(e.target[i * 4].value);
        if (
          e.target[i * 4].value === '' ||
          e.target[i * 4 + 1].value === '' ||
          e.target[i * 4 + 2].value === '' ||
          e.target[i * 4 + 3].value === ''
        ) {
          setAlert('error', 'Please fill all the fields');
          setTimeout(() => {
            clearAlert();
          }, 3000);
          setLoading(false);
          return;
        } else {
          subTitle.push({
            title: e.target[i * 4].value,
            link: e.target[i * 4 + 1].value,
            duration: e.target[i * 4 + 2].value,
            description: e.target[i * 4 + 3].value,
          });
        }
      }
      console.log(subTitle);
      try {
        const response = await axios.post(
          `http://localhost:8080/api/v1/course/${courseId}/subtitle`,
          subTitle,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        setAlert('success', 'Subtitles Added Successfully');
        callBack(subTitle);
      } catch (error) {
        console.log(error);
        const msg = error.response.data.message;
        setAlert('error', msg);
      }
    }
    setTimeout(() => {
      clearAlert();
      submitted();
    }, 3000);
    setLoading(false);
  };

  return (
    <div className={`${classes.container}`}>
      {loading && <Loading></Loading>}
      {alert && (
        <Alert variant={'standard'} severity={alertType}>
          {alertText}
        </Alert>
      )}
      <h1 className={`${classes.title}`}>Add SubTitle</h1>

      <Form className={`${classes.form}`} onSubmit={handleSubmit}>
        {[...Array(subtitles)].map((e, i) => {
          return (
            <div key={'subtitle' + i}>
              <h2>Subtitle {i + 1}</h2>
              <SubTitle />
              <hr />
            </div>
          );
        })}
        <div className={classes.btns}>
          <div className={classes.ARBtns}>
            <Button
              type='button'
              onClick={() => setSubtitles(subtitles + 1)}
              variant='primary'
              style={{ marginRight: '1rem' }}
            >
              Add Subtitle
            </Button>
            <Button
              type='button'
              variant='default'
              style={{ color: 'white', backgroundColor: '#f44336' }}
              disabled={subtitles === 0}
              onClick={() => setSubtitles(subtitles - 1)}
            >
              Remove Subtitle
            </Button>
          </div>
          <Button
            type='submit'
            disabled={loading || subtitles === 0}
            variant='default'
            style={{
              marginTop: '1rem',
              color: 'white',
              backgroundColor: '#4caf50',
            }}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default SubtitleForm;

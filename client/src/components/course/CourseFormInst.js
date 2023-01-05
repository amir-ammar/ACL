import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/App/appContext';

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
}));

function CourseFormInst({ addCourseFront, instId }) {
  const classes = useStyles();

  const { courseId } = useParams();
  const { alert, setAlert, clearAlert, alertText, alertType } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      instructorId: instId
    };

    try {
      const response = await axios.request({
        baseURL: courseId
          ? `http://localhost:8080/api/v1/course/${courseId}`
          : 'http://localhost:8080/api/v1/course/',
        method: courseId ? 'PATCH' : 'POST',
        data: course,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });


      setAlert(
        'success',
        `Course ${courseId ? 'Updated' : 'Created'} successfully`
      );

      setTimeout(() =>
        clearAlert()
      ,3000);
} catch (error) {
  const { msg } = error.response.data;

  console.log(error.response.data.msg);

  setAlert('error', msg);

  clearAlert();

  console.log(error);
}
  };

return (
  <div className="border-3 m-0 m-md-5" style={{ background: "#cccccc" }}>
    <h1 className={`${classes.title}`}>
      {courseId ? 'Update' : 'Add'} Course
    </h1>
    {/* make the alert small */}

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
          <Form.Label>Subject</Form.Label>
          <Form.Control type='text' placeholder='Subject' />
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formGridPrice'>
          <Form.Label>Price</Form.Label>
          <Form.Control type='text' placeholder='Enter course price' />
        </Form.Group>

        <Form.Group as={Col} controlId='formGridNumberOfHours'>
          <Form.Label>Number Of Hours</Form.Label>
          <Form.Control type='text' placeholder='Number Of Hours' />
        </Form.Group>

        <Form.Group as={Col} controlId='formGridPromotion'>
          <Form.Label>Promotion</Form.Label>
          <Form.Control type='text' placeholder='Promotion' />
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

      <Button variant='primary' type='submit'>
        {courseId ? 'Update' : 'Add'} Course
      </Button>
    </Form>
  </div>
);
}

export default CourseFormInst;

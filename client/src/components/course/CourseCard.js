import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {Link} from 'react-router-dom'
import currencyConverter from '../../services/CurrencyConverter';
import {useState,useEffect} from 'react'
import { useAppContext } from '../../context/App/appContext';

function CourseCard({
  courseId,
  courseTitle,
  courseDescription,
  courseInstructor,
  coursePrice,
  courseSubject,
  courseSummary,
  isInstructorCourses,
}) {
  // console.log({ courseTitle, courseDescription, courseInstructor ,coursePrice});
  const {user} = useAppContext()
  let userCountry = user.country
  const [price,setPrice] = useState(coursePrice);
  const [currency,setCurrency] = useState("USD") 
  useEffect(()=>{
    const getPrice = async()=>{
      let {price,currency} = await currencyConverter(userCountry,coursePrice);
      setPrice(price);
      setCurrency(currency);
    }
    getPrice();
  },[])
  return (
    <Link to={`/course/${courseId}`} className="text-black text-decoration-none">
      <Card style={{ width: '20rem', margin: '8px' }}>
        <Card.Img variant='top' src='../Images/course1.png' />
        <Card.Body className="p-2">
          <Card.Title>{courseTitle}</Card.Title>
          <Card.Text>{courseDescription}</Card.Text>
          <ListGroup className='list-group-flush'>
            <ListGroup.Item>{courseInstructor}</ListGroup.Item>
            {coursePrice && <span>price : {price} {currency}</span>}
            {courseSubject && <span>subject : {courseSubject}</span>}
            {courseSummary && <span>summary : {courseSummary.substring(0, 20)}</span>}
            <ListGroup.Item></ListGroup.Item>
          </ListGroup>
        </Card.Body>
        <Card.Body>
          {isInstructorCourses && <Link className='btn btn-link' to={`/course/${courseId}/subtitle`} >Add Subtitles</Link> }
          {isInstructorCourses && <Link className='btn btn-link ms-2' to={`/updateCourse/${courseId}`}>Update Course</Link> }
        </Card.Body>
      </Card>
    </Link>
  );
}

export default CourseCard;

import RequestCourse from '../components/RequestCourse';
import React, { useEffect, useRef, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useCourseContext } from '../context/Course/courseContext';
import SubTitles from '../components/subtitle/SubTitles';
import { Box, Typography } from '@material-ui/core';
import Review from '../components/Review';
import { CourseComponent, Loading } from '../components';
import { AiOutlineCheck } from 'react-icons/ai';
import { useAppContext } from '../context/App/appContext';
import { AiFillVideoCamera } from 'react-icons/ai';
import { MdOutlineArticle } from 'react-icons/md';
import { TbCertificate } from 'react-icons/tb';
import { GiReceiveMoney } from 'react-icons/gi';
import AlertDialog from '../components/AlertDialog';
import SnackBar from '../components/SnackBar';
import Footer from '../components/Footer';
import PromotionForm from '../components/PromotionForm';
import ExamForm from '../components/ExamForm';
import SubtitleForm from '../components/subtitle/SubtitleForm';
import InstructorRating from '../components/InstructorRating';
import { Rating } from '@material-ui/lab';
import { BsClock } from 'react-icons/bs';
import { BsPeople } from 'react-icons/bs';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import BuyCourse from '../components/BuyCourse';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    marginTop: '3.9rem',
  },
  background: {
    width: '100%',
    backgroundColor: '#2D3331',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '2rem',
  },
  info: {
    width: '80%',
    height: '100%',
    marginLeft: '5%',
    color: 'white',
    padding: '4%',
    display: 'flex',
    flexDirection: 'column',
  },
  subtitle: {
    marginLeft: '8%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '5rem',
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50px',
  },
  description: {
    marginLeft: '8rem',
    marginRight: '10rem',
  },
  content: {
    marginLeft: '5rem',
    marginRight: '5rem',
    marginTop: '13rem',
  },
  showMore: {
    border: 'none',
    backgroundColor: 'transparent',
    color: '#3f51b5',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  Items: {
    overflow: 'auto',
  },
  reviewCourse: {
    width: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '55%',
    left: '80%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#dcdad7',
    paddingBottom: '2rem',
    borderRadius: '1rem',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
  },
  reviewVideo: {
    width: '100%',
    height: '15rem',
    borderRadius: '1rem 1rem 0 0',
    backgroundColor: 'black',
  },

  finalPrice: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actualPrice: {
    textDecoration: 'line-through',
    marginRight: '1rem',
  },
  discount: {
    fontWeight: '100',
  },
  discountPrice: {
    color: 'black',
    marginRight: '1rem',
    fontSize: '2rem',
    fontWeight: 'bold',
  },

  addToCart: {
    width: '20rem',
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
    height: '3rem',
    backgroundColor: '#3f51b5',
    color: 'white',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  coupon: {
    width: '20rem',
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
    height: '3rem',
    border: 'none',
    borderRadius: '0.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginTop: '1rem',
    marginBottom: '1rem',
    // on hover
    '&:hover': {
      backgroundColor: '#2D3331',
      color: 'white',
    },
  },

  line: {
    width: '90%',
    height: '1px',
    backgroundColor: 'black',
    marginTop: '1rem',
    marginBottom: '1rem',
  },

  applyCoupon: {
    width: '20rem',
    marginLeft: '2.5rem',
    marginRight: '2.5rem',
    marginTop: '1rem',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#3f51b5',
    alignItems: 'center',
    color: 'white',
  },

  applyCouponInput: {
    border: 'none',
    borderRadius: '0.5rem 0 0 0.5rem',
    fontSize: '1.2rem',
    padding: '0.5rem',
  },

  applyCouponButton: {
    border: 'none',
    borderRadius: '0 0.5rem 0.5rem 0',
    fontSize: '1.2rem',
    padding: '0.5rem',
    backgroundColor: '#2D3331',
    color: 'white',
    cursor: 'pointer',
  },

  courseInclude: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '2rem',
  },

  included: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '1rem',
  },

  cart: {
    width: '15rem',
    height: '10rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    borderRadius: '0.5rem',
    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.5)',
    '&:hover': {
      backgroundColor: '#dcdad7',
    },
    marginRight: '1rem',
  },

  icon: {
    width: '5rem',
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const CoursePage = () => {
  const classes = useStyles();
  const { courseId } = useParams();
  const [subtitles, setSubtitles] = useState(null);
  const { courses, myCourses } = useCourseContext();
  const [course, setCourse] = useState({});
  const { token, user } = useAppContext();
  const [showDescription, setShowDescription] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [requestRefund, setRequestRefund] = useState(false);
  const [showRefundForm, setShowRefundForm] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showExamForm, setShowExamForm] = useState(false);
  const [showSubtitleForm, setShowSubtitleForm] = useState(false);
  const [alert, setAlert] = useState(null);
  const [showPromotionForm, setShowPromotionForm] = useState(false);
  const inputRef = useRef();

  console.log('course', course);
  const updateSubtitles = (newSubtitles) => {
    setSubtitles([...subtitles, ...newSubtitles]);
  };

  useEffect(() => {
    setLoading(true);

    function getCourse() {
      const course = courses.find(
        (course) => course._id.toString() === courseId.toString()
      );

      courses.map((course) => {
        if (!course.price) course.price = course.originalPrice;
      });

      setCourse(course);
      if (course && course.promotion) {
        const promotion = course.promotion;
        const currentDate = new Date();
        const startDate = new Date(promotion.startDate);
        const endDate = new Date(promotion.endDate);
        if (currentDate >= startDate && currentDate <= endDate) {
          setDiscountPrice(
            (course.price || course.originalPrice) -
              (course.price * promotion.promotionPercentage) / 100
          );
        }
      }
      setLoading(false);
    }

    async function getSubtitles() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/course/${courseId}/subtitle`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSubtitles(response.data.subTitles);
    }

    function checkOwnership() {
      const course = myCourses.find(
        (course) => course._id.toString() === courseId.toString()
      );
      if (course) {
        if (course?.createdBy?.toString() === user?._id.toString()) {
          setIsOwner(true);
        } else {
          setIsEnrolled(true);
        }
      }
    }

    async function checkRefundState() {
      const response = await axios.get(
        `http://localhost:8080/api/v1/refund`,
        {
          courseId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      console.log(response.data);
    }

    getCourse();
    checkOwnership();

    if (!subtitles) {
      getSubtitles();
    }
    console.log('*****************');
    if (isEnrolled) {
      console.log(
        '-----------------------------------------------------------------------------------'
      );
      checkRefundState();
    }
  }, [courseId, courses, myCourses, token, isEnrolled]);

  const requestRefundHandler = () => {
    setLoading(true);
    setRequestRefund(false);
    try {
      const response = axios.post(
        `http://localhost:8080/api/v1/refund`,
        {
          courseId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRequestRefund(false);
      setAlert("You've requested a refund successfully");
    } catch (error) {
      console.log(error);
      setAlert('You have requested a refund before');
    }
    setLoading(false);
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const applyCouponHandler = () => {
    console.log('apply coupon');
  };
  console.log(isEnrolled);
  return (
    <>
      {loading && <Loading type={'spin'} color={'#3f51b5'} />}
      {!loading && (
        <main className={`${classes.main}`}>
          <div className={`${classes.background}`}>
            <div className={`${classes.info}`}>
              <h1
                style={{
                  color: 'white',
                }}
              >
                {course?.title}
              </h1>
              <h2
                style={{
                  color: 'white',
                }}
              >
                {course?.subject}
              </h2>
              <p>{course && course?.summary?.slice(0, 50)}</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                {course && (
                  <>
                    <div
                      style={{
                        marginRight: '1rem',
                      }}
                    >
                      <BsClock /> {course?.numberOfHours} hours
                      <Rating
                        name='customized-empty'
                        disabled
                        value={course?.rating || 0}
                        precision={0.2}
                        emptyIcon={
                          <StarBorderIcon
                            fontSize='inherit'
                            style={{ color: 'white' }}
                          />
                        }
                      />
                    </div>
                    <div>
                      <BsPeople /> {course?.numberOfStudents} students
                    </div>
                  </>
                )}
              </div>
            </div>
            <AlertDialog
              handleAgree={() => requestRefundHandler()}
              handleDisagree={() => setRequestRefund(false)}
              open={requestRefund}
              title='Request Refund'
              content='Are you sure you want to request refund?'
            />
            {alert && <SnackBar content={alert} />}

            <Box className={`${classes.reviewCourse}`}>
              <div className={`${classes.reviewVideo}`}>
                <iframe
                  width='400'
                  height='240'
                  src={`${course?.previewLink}`}
                  title='YouTube video player'
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                ></iframe>
              </div>
              {!isEnrolled && (
                <div className={`${classes.finalPrice}`}>
                  <Typography
                    variant='h6'
                    className={`${classes.discountPrice}`}
                  >
                    {discountPrice && Math.floor(discountPrice)}
                    {!discountPrice && (course?.price || course?.originalPrice)}
                    {course?.currency}
                  </Typography>
                  <Typography variant='h6' className={`${classes.actualPrice}`}>
                    {discountPrice && (course?.price || course?.originalPrice)}
                    {course?.currency}
                  </Typography>
                  <Typography variant='h6' className={`${classes.discount}`}>
                    {discountPrice &&
                      `${course?.promotion.promotionPercentage}%`}
                  </Typography>
                </div>
              )}

              {(isEnrolled || isOwner) && (
                <button className={`${classes.addToCart}`}>
                  <Link to={`/course/${courseId}/content`}>Go to course</Link>
                </button>
              )}

              {!isEnrolled &&
                !isOwner &&
                user.type === 'Individual trainee' && (
                  <BuyCourse
                    courseId={courseId}
                    coursePrice={course?.originalPrice}
                  ></BuyCourse>
                )}

              {!isEnrolled && !isOwner && user.type === 'Corporate trainee' && (
                <RequestCourse courseId={courseId}></RequestCourse>
              )}

              <p>
                <AiOutlineCheck /> 30-Day Money-Back Guarantee
              </p>
              <p>
                <AiOutlineCheck />
                Full Lifetime Access
              </p>
              {isEnrolled && applyCoupon && (
                <>
                  <hr className={`${classes.line}`} />
                  <div className={`{${classes.applyCoupon}}`}>
                    <input
                      type={'text'}
                      placeholder={'Enter the reason'}
                      className={`${classes.applyCouponInput}`}
                      ref={inputRef}
                    />
                    <button
                      className={classes.applyCouponButton}
                      onClick={() => {
                        isEnrolled
                          ? setRequestRefund(true)
                          : applyCouponHandler();
                      }}
                    >
                      Request
                    </button>
                  </div>
                </>
              )}
              {isEnrolled && !applyCoupon && (
                <>
                  <button
                    className={classes.coupon}
                    onClick={() => setApplyCoupon(true)}
                  >
                    {isEnrolled ? <>Request Refund</> : <>Apply Coupon</>}
                  </button>
                </>
              )}

              {/* {!applyCoupon && (
                <button
                  className={classes.coupon}
                  onClick={() => setApplyCoupon(true)}
                >
                  {isEnrolled ? <>Request Refund</> : <>Apply Coupon</>}
                </button>
              )} */}
              {/* {applyCoupon && (
                <>
                  <hr className={`${classes.line}`} />
                  <div className={`{${classes.applyCoupon}}`}>
                    <input
                      type={isEnrolled ? 'number' : 'text'}
                      placeholder={
                        isEnrolled
                          ? 'Enter the amount of money'
                          : 'Enter coupon'
                      }
                      className={`${classes.applyCouponInput}`}
                      ref={inputRef}
                    />
                    <button
                      className={classes.applyCouponButton}
                      onClick={() => {
                        isEnrolled
                          ? setRequestRefund(true)
                          : applyCouponHandler();
                      }}
                    >
                      {isEnrolled ? 'Request' : 'Apply'}
                    </button>
                  </div>
                </>
              )} */}
            </Box>
            {/* frame for youtube video here  */}
          </div>
          <div className={`${classes.content}`}>
            <section className={`${classes.description}`}>
              <h2 className={`${classes.title}`}>Description</h2>
              {course?.summary && (
                <Box>
                  {course?.summary.slice(
                    0,
                    showDescription ? course?.summary.length : 300
                  )}
                  {course?.summary.length > 300 && (
                    <p>
                      <button
                        className={`${classes.showMore}`}
                        onClick={() => setShowDescription(!showDescription)}
                      >
                        {showDescription ? 'Show less' : 'Show more'}
                      </button>
                    </p>
                  )}
                </Box>
              )}
            </section>

            {!isOwner && (
              <section className={classes.courseInclude}>
                <h2 className={`${classes.title}`}>This course includes</h2>
                <div className={`${classes.included}`}>
                  <Box className={classes.cart}>
                    <AiFillVideoCamera className={classes.icon} />
                    <p className={classes.comment}> 10 hours on-demand video</p>
                  </Box>
                  <Box className={classes.cart}>
                    <MdOutlineArticle className={classes.icon} />
                    <p className={classes.comment}> 10 articles</p>
                  </Box>
                  <Box className={classes.cart}>
                    <TbCertificate className={classes.icon} />
                    <p className={classes.comment}>
                      {' '}
                      Certificate of Completion
                    </p>
                  </Box>
                </div>
              </section>
            )}

            {isOwner && (
              <section className={classes.courseInclude}>
                <h2 className={`${classes.title}`}>Course Control Board</h2>
                <div className={`${classes.included}`}>
                  <Box
                    className={classes.cart}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (showExamForm) setShowExamForm(false);
                      if (showPromotionForm) setShowPromotionForm(false);
                      setShowSubtitleForm((prev) => !prev);
                    }}
                  >
                    <AiFillVideoCamera className={classes.icon} />
                    <p className={classes.comment}> Upload Subtitle </p>
                  </Box>
                  <Box
                    className={classes.cart}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (showSubtitleForm) setShowSubtitleForm(false);
                      if (showPromotionForm) setShowPromotionForm(false);
                      setShowExamForm((prev) => !prev);
                    }}
                  >
                    <MdOutlineArticle className={classes.icon} />
                    <p className={classes.comment}> Upload Exam</p>
                  </Box>
                  <Box
                    className={classes.cart}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (showSubtitleForm) setShowSubtitleForm(false);
                      if (showExamForm) setShowExamForm(false);
                      setShowPromotionForm((prev) => !prev);
                    }}
                  >
                    <GiReceiveMoney className={classes.icon} />
                    <p className={classes.comment}>Define Promotion</p>
                  </Box>
                </div>
              </section>
            )}

            {showPromotionForm && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <PromotionForm submitted={() => setShowPromotionForm(false)} />
              </div>
            )}

            {showExamForm && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <ExamForm submitted={() => setShowExamForm(false)} />
              </div>
            )}

            {showSubtitleForm && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <SubtitleForm
                  callBack={updateSubtitles}
                  submitted={() => setShowSubtitleForm(false)}
                />
              </div>
            )}

            <section>
              <div className={`${classes.subtitle}`}>
                {subtitles && subtitles.length > 0 && (
                  <SubTitles data={subtitles} />
                )}
                <br />
                <br />
              </div>
            </section>

            <section>
              <h2 className={`${classes.title}`}>Instructor</h2>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <InstructorRating
                  instructorId={course?.createdBy?._id}
                  type={isEnrolled ? 'enrolled' : isOwner ? 'owner' : 'none'}
                />
              </div>
            </section>

            <section>
              <h2 className={`${classes.title}`}>Reviews</h2>
              {course && course?.reviews && (
                <Box
                  display='flex'
                  flexDirection='row'
                  className={`${classes.Items}`}
                >
                  {course?.reviews.map((review) => (
                    <Review
                      key={review._id}
                      username={review.username}
                      reviewText={review.review}
                      rate={review?.rate}
                    />
                  ))}
                </Box>
              )}
              <br />
            </section>

            <section>
              <h2 className={`${classes.title}`}>Suggested Courses</h2>
              {courses && (
                <Box
                  display='flex'
                  flexDirection='row'
                  justifyContent='center'
                  className={`${classes.Items}`}
                >
                  {courses.map(
                    (item) =>
                      course &&
                      course.subject === item.subject && (
                        <div
                          onClick={() => window.scrollTo(0, 0)}
                          key={item._id}
                        >
                          <CourseComponent
                            title={item?.title}
                            subject={item?.subject}
                            description={item?.summary}
                            instructor={item?.createdBy.username}
                            price={item?.price}
                            courseId={item?._id}
                            currency={item?.currency}
                            horizontal={false}
                          />
                        </div>
                      )
                  )}
                </Box>
              )}
            </section>
            <br />
            <br />
          </div>
          <Footer />
        </main>
      )}
    </>
  );
};

export default CoursePage;

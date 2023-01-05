const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourse,
  updateCourse,
  getCoursesInstructor,
  courseEnroll,
  getEnrolledCourses,
  buyWithWallet,
} = require('../controllers/courseController');

const {
  createSubTitle,
  getAllSubTitles,
  getSubTitle,
  updateSubTitle,
} = require('../controllers/subTitleController');

const { authMiddleware } = require('../middlewares');

router.route('/').post(authMiddleware, createCourse).get(getAllCourses);
router
  .route('/:courseId')
  .get(authMiddleware, getCourse)
  .patch(authMiddleware, updateCourse);
router.get('/instructor/:id', authMiddleware, getCoursesInstructor);
router.get('/usersCourses', authMiddleware, getCoursesInstructor);
router.get('/enrolledCourses', authMiddleware, getEnrolledCourses);
router.get('/buyWithWallet/:courseId',authMiddleware,buyWithWallet)

// SubTitle Routes

router
  .route('/:courseId/subtitle/')
  .post(authMiddleware, createSubTitle)
  .get(getAllSubTitles);
router
  .route('/:courseId/subtitle/:subtitleId')
  .get(authMiddleware, getSubTitle)
  .patch(authMiddleware, updateSubTitle);

// student routes
router.route('/:courseId/enroll').post(authMiddleware, courseEnroll);

module.exports = router;

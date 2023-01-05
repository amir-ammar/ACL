
const express = require('express');

const router = express.Router();

const  {addRequest,getAllRequest,getRequests} = require('../controllers/RequestCourseController');
const {authAdmin,authMiddleware} = require('../middlewares');


router.post('/addRequest/:courseId',authMiddleware,addRequest);
router.get('/getAllRequest',authMiddleware,authAdmin,getAllRequest);
router.get('/getRequests/:courseId',authMiddleware,getRequests);


module.exports = router;

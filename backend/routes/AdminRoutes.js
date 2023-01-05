const express=require('express');
const router=express.Router();
const AdminController=require ('../controllers/AdminController');

// GET a single exercise

// POST a new create new user 
router.post('/',AdminController.createUser);
router.get('/',AdminController.getuser);

//get all report
router.get('/report',AdminController.getAllreport);

//mark report as resovle or pending
router.patch('/reportstate',AdminController.updatereport)
//refund an amoute to trainee
router.patch('/trineerefund',)
//get all course request
router.get('/coursereqeut',AdminController.getAllcourserequest)
router.get('/courses',AdminController.getallcourses)


// grant the course request
router.patch('/grantcourse',AdminController.updatecourserequest)
//set promotion for course
router.patch('/setpromotion',AdminController.setpromtion)
router.patch('/setcomment',AdminController.setcomment)
router.get('/refund',AdminController.getRefunds)

router.patch('/usersetcomment',AdminController.usersetcomment)
router.patch('/updaterefund',AdminController.udaterefund)













module.exports=router
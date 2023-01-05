const express = require('express');
const router = express.Router();
const {
  register,
  login,
  logout,
  updateUser,
  forgetPassword,
  resetPassword,
} = require('../controllers/authController');
const { authMiddleware } = require('../middlewares');

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').post(logout);
router.route('/update').patch(authMiddleware, updateUser);
router.route('/forgetPassword').post(forgetPassword);
router.route('/resetPassword').post(resetPassword);

module.exports = router;

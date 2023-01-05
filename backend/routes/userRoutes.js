const express = require('express');
const router = express.Router();
const {
  findWallet,
  addWallet,
  allWallets,
  updateWallet,
  deleteWallet,
  findEarnings,
} = require('../controllers/walletController');

const { createreport, getreport } = require('../controllers/userController');

const {
  findCertification,
  allCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} = require('../controllers/CertificationController');

const {
  updateUserProgress,
  getUserProgress,
  updateUserInfo,
  getUserInfo,
} = require('../controllers/userController');

const { authOwner, authAdmin, authMiddleware } = require('../middlewares');

// wallet router

router.get('/earning', authMiddleware, findEarnings);
router.get('/wallet', authMiddleware, allWallets);
router.get('/wallet/:id', authMiddleware, findWallet);
router.post('/wallet/', authMiddleware, addWallet);
router.patch('/wallet/:id', authMiddleware, updateWallet);
router.delete('/wallet/:id', authMiddleware, deleteWallet);

// end wallet router

// certification router

router.get('/certification', authMiddleware, authAdmin, allCertifications);
router.get('/certification/:id', authMiddleware, authOwner, findCertification);
router.post('/certification', authMiddleware, authAdmin, createCertification);
router.patch(
  '/certification/:id',
  authMiddleware,
  authAdmin,
  updateCertification
);
router.delete(
  '/certification/:id',
  authMiddleware,
  authAdmin,
  deleteCertification
);
// end certification router
router.post('/reportproblem', authMiddleware, createreport);
router.get('/getrport', authMiddleware, getreport);
router.patch('/', authMiddleware, updateUserInfo);
router.get('/:userId', getUserInfo);

// update course progress
router.get('/progress/:courseId', authMiddleware, getUserProgress);
router.patch('/progress/:courseId', authMiddleware, updateUserProgress);

module.exports = router;

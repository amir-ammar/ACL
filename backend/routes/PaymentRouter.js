
const express = require('express');
const router = express.Router();

const {getPaymentSession,addPayment} =  require('../controllers/PaymentController');
const {authOwner,authMiddleware} = require('../middlewares');

router.post('/create-checkout-session',authMiddleware,authOwner,getPaymentSession);
router.post('/webhook',addPayment);

module.exports = router;


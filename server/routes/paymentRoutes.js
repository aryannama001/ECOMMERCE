const express = require('express');
const { processPayment, sendStripeApiKey } = require('../controllers/paymentController');
const router = express.Router()
const { authenticateUser, admin } = require('../middleware/auth');

router.route('/process').post(authenticateUser, processPayment)
router.route('/stripeapikey').get(authenticateUser, sendStripeApiKey)

module.exports = router
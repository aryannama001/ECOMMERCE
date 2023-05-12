const express = require('express');
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router()
const { authenticateUser, admin } = require('../middleware/auth');


router.route('/new').post(authenticateUser, newOrder)

router.route('/:id').get(authenticateUser, getSingleOrder).put(authenticateUser, admin, updateOrder).delete(authenticateUser, admin, deleteOrder)
router.route('/me/my-orders').get(authenticateUser, myOrders)

router.route('/all').get(authenticateUser, admin, getAllOrders)


module.exports = router
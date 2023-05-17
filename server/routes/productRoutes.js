const express = require('express');
const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct, createProductReview, getAllReviews, deleteReview, featuredProducts, getAllAdminProducts } = require('../controllers/productController');
const { authenticateUser, admin } = require('../middleware/auth');
const router = express.Router();


router.route("/").get(getAllProducts).post(authenticateUser, admin, createProduct)

router.route('/featured-products').get(featuredProducts)


router.route("/:id").get(getProduct).put(authenticateUser, admin, updateProduct).delete(authenticateUser, admin, deleteProduct)

router.route("/:id/review").put(authenticateUser, createProductReview)
    .get(getAllReviews)
    .delete(authenticateUser, deleteReview)


router.route("/admin/all").get(authenticateUser, admin, getAllAdminProducts)


module.exports = router
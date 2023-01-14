const express = require('express');
const { getAllProducts, createProduct, getProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

getAllProducts



router.route("/").get(getAllProducts)

router.route("/product/new").post(createProduct)

router.route("/product/:id").get(getProduct).put(updateProduct).delete(deleteProduct)

module.exports = router
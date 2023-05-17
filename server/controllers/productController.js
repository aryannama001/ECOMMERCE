const Product = require('../models/Product');
const cloudinary = require('cloudinary')

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 8
        const skip = limit * (page - 1);
        let products;



        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i",
                },
            }
            : {};

        //search products
        products = Product.find(keyword);

        //filtering
        const queryObj = { ...req.query }
        const excludedFields = ['page', 'sort', 'limit', 'keyword']
        excludedFields.forEach(el => delete queryObj[el])

        let queryString = JSON.stringify(queryObj)
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
        const totalProducts = await products.countDocuments(JSON.parse(queryString))




        // const filteredProducts = await products.length
        products = await Product.find(JSON.parse(queryString)).limit(limit).skip(skip);

        res.status(200).json({
            success: true,
            products,
            totalProducts
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

exports.getAllAdminProducts = async (req, res) => {
    try {

        const products = await Product.find();

        res.status(200).json({
            success: true,
            products
        })

    } catch (err) {
        res.status(400).json({
            success: false,
            error: err.message
        })
    }
}

exports.featuredProducts = async (req, res) => {
    try {
        const products = await Product.find()

        const featuredProducts = products.sort((a, b) => b.ratings - a.ratings).slice(0, 8);

        res.json({
            success: true,
            featuredProducts
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//create product -- admin
exports.createProduct = async (req, res) => {
    try {
        req.body.user = req.user._id
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}


//get a product
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }
}

//update product
exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id)

        if (!product) {
            throw new Error("Product not found");
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        res.status(404).json({
            success: false,
            error: error.message
        })
    }


}

//delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404)
            throw new Error("Product not found");
        }

        await product.remove();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

//create review

exports.createProductReview = async (req, res) => {
    const { rating, comment } = req.body
    try {
        const review = {
            user: req.user._id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(req.params.id)

        const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString());

        if (isReviewed) {
            product.reviews.forEach(rev => {
                if (rev.user.toString() === req.user._id.toString()) {
                    rev.rating = rating
                    rev.comment = comment
                }
            })
        } else {
            product.reviews.push(review)
            product.numOfReviews = product.reviews.length
        }

        let average = 0;
        product.reviews.forEach(rev => average += rev.rating);
        product.ratings = average / product.reviews.length

        await product.save();

        res.status(200).json({
            success: true,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//get all reviews

exports.getAllReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            res.status(404)
            throw new Error("Product not found");
        }

        res.status(200).json({
            success: true,
            reviews: product.reviews
        })
    } catch (error) {
        res.json({
            success: false,
            error: error.message
        })
    }
}

//delete review
exports.deleteReview = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            throw new Error("Product not found")
        }

        const reviews = product.reviews.filter(
            (rev) => rev.id.toString() !== req.query.reviewId.toString()
        );

        let average = 0;
        reviews.forEach(rev => average += rev.rating);

        let ratings = 0;

        if (reviews.length === 0) {
            ratings = 0;
        } else {
            ratings = average / reviews.length;
        }

        const numOfReviews = reviews.length;

        await Product.findByIdAndUpdate(req.params.id,
            {
                reviews,
                ratings,
                numOfReviews,
            },
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );

        res.status(200).json({
            success: true,
        });


    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
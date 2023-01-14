const Product = require('../models/Product');

//get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({
            success: true,
            products
        })
    } catch (err) {
        console.log(err.message);
    }
}

//create product
exports.createProduct = async (req, res) => {
    try {
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
        const product = Product.findById(req.params.id)

        if (!product) {
            throw new Error("Product not found");
        }

        await product.deleteOne();

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
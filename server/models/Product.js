const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product descrption is required"]
    },
    price: {
        type: Number,
        required: [true, "Please enter Product price"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },
    stock: {
        type: Number,
        required: [true, "Please Enter product Stock"],
        maxLength: [4, "Stock cannot exceed 4 characters"],
        default: 1,
    },
    numOfReviews: {
        type: Number,
        default: 0,
    },
    reviews: [{
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    ],
    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        }
    ],
    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: "User",
    //     required: true
    // },
}, {
    timestamps: true,
});

module.exports = Product = mongoose.model("Product", productSchema);
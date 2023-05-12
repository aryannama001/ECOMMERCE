const Order = require('../models/Order')
const Product = require('../models/Product')

//create new order
exports.newOrder = async (req, res) => {
    try {
        const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

        const order = await Order.create({
            shippingInfo,
            orderItems,
            paymentInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paidAt: Date.now(),
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//get single order -- admin

exports.getSingleOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate("user", "name email");

        if (!order) {
            throw new Error("Order not found");
        }

        res.status(200).json({
            success: true,
            order
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//get user orders

exports.myOrders = async (req, res) => {
    try {
        const order = await Order.find({ user: req.user._id });

        res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//get all orders --admin
exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find();

        let totalAmount = 0;
        orders.forEach(order => {
            totalAmount += order.totalPrice
        })
        res.status(200).json({
            success: true,
            orders,
            totalAmount
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

//update order status --admin
exports.updateOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (order.orderStatus === 'Delivered') {
            throw new Error("Order is already Delivered")
        }

        order.orderItems.forEach(async (item) => {
            await updateStock(item.productId, item.quantity)
        })

        order.orderStatus = req.body.status;

        if (req.body.status === 'Delivered') {
            order.deliveredAt = Date.now();
        }

        await order.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({ validateBeforeSave: false })
}


exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            throw new Error("Order not found")
        }

        await order.remove()

        res.status(200).json({
            success: true
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}
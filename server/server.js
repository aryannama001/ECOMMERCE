const express = require('express')
const app = express();
const connectDB = require('./config/database')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary')
const cors = require('cors')



require('dotenv').config({ path: "server/config/config.env" });
app.use(cors())
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())




connectDB();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});




app.use("/api/products", require('./routes/productRoutes'));
app.use("/api/users", require('./routes/userRoutes'));
app.use("/api/order", require('./routes/orderRoutes'))
app.use("/api/payment", require('./routes/paymentRoutes'))


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
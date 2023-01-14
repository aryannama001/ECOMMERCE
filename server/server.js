const express = require('express')
const app = express();
const connectDB = require('./config/database')



require('dotenv').config({ path: "server/config/config.env" });
app.use(express.json());


connectDB();




app.use("/api/products", require('./routes/productRoutes'));



const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
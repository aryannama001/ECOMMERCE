import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Products from './pages/Products/Products';
import ProductDetails from './pages/ProductDetails/ProductDetails';
import Login from './pages/LoginSignup/Login';
import Register from './pages/LoginSignup/Register';
import Profile from './pages/Profile/Profile';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { loadUser } from './features/userSlice';
import ProtectedRoute from './ProtectedRoute';
import Cart from './pages/Cart/Cart';
import Shipping from './pages/shipping/Shipping';
import ConfirmOrder from './pages/shipping/ConfirmOrder';
import axios from 'axios';
import Payment from './pages/shipping/Payment';
import OrderSuccess from './pages/shipping/OrderSuccess';
import MyOrders from './pages/MyOrders/MyOrders';
import OrderDetail from './pages/MyOrders/OrderDetail';
import ContactUs from './pages/ContactUs';
import AboutUs from './pages/AboutUs';
import Footer from './components/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";




function App() {
  const dispatch = useDispatch()

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get('/api/payment/stripeapikey');

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    dispatch(loadUser())

    getStripeApiKey();
  }, [dispatch])
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />

        <Route element={<ProtectedRoute />} >
          <Route path='/profile' element={<Profile />} />
          <Route path='/shipping' element={<Shipping />} />
          <Route path='/confirm-order' element={<ConfirmOrder />} />
          <Route path='/process/payment' element={<Payment stripeApiKey={stripeApiKey} />} />
          <Route path='/order-place/success' element={<OrderSuccess />} />
          <Route path='/myorders' element={<MyOrders />} />
          <Route path='/order/:id' element={<OrderDetail />} />
        </Route>

        <Route path='/cart' element={<Cart />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<AboutUs />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

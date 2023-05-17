import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { AdminProductsSlice } from '../features/productsSlice'
import productReducer from '../features/productSlice'
import userReducer from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import orderSlice from '../features/orderSlice';
import { myOrders, orderDetails } from '../features/orderSlice';
export const store = configureStore({
  reducer: {
    products: productsReducer,
    product: productReducer,
    user: userReducer,
    cart: cartReducer,
    newOrder: orderSlice,
    myOrders: myOrders.reducer,
    orderDetails: orderDetails.reducer,
    adminProducts: AdminProductsSlice.reducer
  },
});

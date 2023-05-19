import { configureStore } from '@reduxjs/toolkit';
import productsReducer, { AdminProductsSlice, newProductSlice } from '../features/productsSlice'
import productReducer, { getAllReviewsSlice, updateProductSlice } from '../features/productSlice'
import userReducer, { getAllUsersSlice, getUserSlice } from '../features/userSlice';
import cartReducer from '../features/cartSlice';
import orderSlice, { AllOrdersSlice } from '../features/orderSlice';
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
    adminProducts: AdminProductsSlice.reducer,
    newProduct: newProductSlice.reducer,
    updateProduct: updateProductSlice.reducer,
    AllOrders: AllOrdersSlice.reducer,
    allUsers: getAllUsersSlice.reducer,
    adminUser: getUserSlice.reducer,
    allReviews: getAllReviewsSlice.reducer
  },
});

import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import userReducer from './slices/userSlice';
import productReducer from './slices/productSlice';
import cartReducer from './slices/cartSlice';

// Import reducers (we'll create these next)

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    products: productReducer,
    cart: cartReducer,
  },
  // Middleware và các cấu hình khác có thể thêm ở đây
  devTools: process.env.NODE_ENV !== 'production',
});

export default store; 
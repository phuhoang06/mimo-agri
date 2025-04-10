import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import productReducer from './slices/productSlice';
import orderReducer from './slices/orderSlice';
import loggerMiddleware from './middleware/loggerMiddleware';

// Import reducers (we'll create these next)

const store = configureStore({
  reducer: {
    counter: counterReducer,
    products: productReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware),
});

export default store; 
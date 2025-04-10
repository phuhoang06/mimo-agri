import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const submitOrder = createAsyncThunk(
  'order/submitOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      // Thay thế URL API thực tế của bạn
      const response = await axios.post('/api/orders', orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cart: [],
  orderInfo: {
    customerName: '',
    phone: '',
    email: '',
    address: '',
    notes: '',
  },
  loading: false,
  error: null,
  orderSuccess: false,
  orderNumber: null,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.cart.find(item => item.id === action.payload.id);
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity || 1;
      } else {
        state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find(item => item.id === id);
      if (product) {
        product.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
    updateOrderInfo: (state, action) => {
      state.orderInfo = { ...state.orderInfo, ...action.payload };
    },
    resetOrder: (state) => {
      state.cart = [];
      state.orderInfo = initialState.orderInfo;
      state.orderSuccess = false;
      state.orderNumber = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderSuccess = true;
        state.orderNumber = action.payload.orderNumber;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Có lỗi xảy ra khi đặt hàng';
      });
  }
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  updateOrderInfo,
  resetOrder
} = orderSlice.actions;

export default orderSlice.reducer; 
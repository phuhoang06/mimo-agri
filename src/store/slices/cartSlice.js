import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalAmount: 0,
  totalCount: 0
};

// Helper function để tính toán tổng số lượng và tổng giá trị
const calculateTotals = (items) => {
  let totalAmount = 0;
  let totalCount = 0;
  
  items.forEach(item => {
    totalCount += item.quantity;
    totalAmount += item.price * item.quantity;
  });
  
  return { totalAmount, totalCount };
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, image } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          id,
          name,
          price,
          image,
          quantity: 1
        });
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload);
      if (item) {
        item.quantity -= 1;
        if (item.quantity === 0) {
          state.items = state.items.filter(item => item.id !== action.payload);
        }
      }
      
      const totals = calculateTotals(state.items);
      state.totalAmount = totals.totalAmount;
      state.totalCount = totals.totalCount;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalAmount = 0;
      state.totalCount = 0;
    }
  }
});

// Export actions
export const { 
  addToCart, 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} = cartSlice.actions;

// Export reducer
export default cartSlice.reducer; 
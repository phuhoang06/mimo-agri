import { createSlice } from '@reduxjs/toolkit';
import { allProducts } from '../../data/products';

const initialState = {
  products: allProducts(),
  loading: false,
  error: null,
  selectedProduct: null,
  filteredProducts: allProducts(),
  filters: {
    category: null,
    search: '',
  }
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilter: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // Áp dụng bộ lọc
      state.filteredProducts = state.products.filter(product => {
        // Lọc theo danh mục
        const categoryMatch = !state.filters.category || 
          product.categoryId === state.filters.category;
        
        // Lọc theo tìm kiếm
        const searchMatch = !state.filters.search || 
          product.title.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          product.description.toLowerCase().includes(state.filters.search.toLowerCase()) ||
          product.tags.some(tag => tag.toLowerCase().includes(state.filters.search.toLowerCase()));
        
        return categoryMatch && searchMatch;
      });
    },
    clearFilters: (state) => {
      state.filters = { category: null, search: '' };
      state.filteredProducts = state.products;
    }
  }
});

export const { setSelectedProduct, setFilter, clearFilters } = productSlice.actions;

export default productSlice.reducer; 
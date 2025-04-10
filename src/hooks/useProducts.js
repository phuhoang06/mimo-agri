import { useState, useEffect, useMemo } from 'react';
import { 
  allProducts,
  topSellingProducts,
  newProducts,
  getProductsByCategory,
  searchProducts as filterProductsBySearch,
  filterProductsByPrice,
  sortProducts
} from '../data/products';

/**
 * Hook tái sử dụng cho các thao tác với sản phẩm
 * @param {Object} options - Các tùy chọn cho hook
 * @returns {Object} - Các giá trị và hàm xử lý sản phẩm
 */
const useProducts = (options = {}) => {
  const { 
    initialCategory = 'all',
    initialPriceRange = { min: 0, max: Infinity },
    initialSearchTerm = '',
    limit = null,
    productId = null
  } = options;

  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState(initialPriceRange);
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(limit || 10);

  // Get all products
  const products = useMemo(() => allProducts(), []);

  // Get a specific product by ID
  const product = useMemo(() => 
    productId ? products.find(p => p.id === productId) : null, 
    [productId, products]
  );

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    let results = products;

    // Filter by category
    if (category && category !== 'all') {
      results = getProductsByCategory(category);
    }

    // Filter by price range
    if (priceRange.min !== 0 || priceRange.max !== Infinity) {
      results = filterProductsByPrice(results, priceRange.min, priceRange.max);
    }

    // Filter by search term
    if (searchTerm) {
      results = filterProductsBySearch(searchTerm);
    }

    return results;
  }, [products, category, priceRange, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [category, priceRange, searchTerm]);

  return {
    // Data
    product,
    allProducts: products,
    topSellingProducts: topSellingProducts(),
    newProducts: newProducts(),
    filteredProducts,
    paginatedProducts,
    
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    setItemsPerPage,
    
    // Filters
    category,
    setCategory,
    priceRange,
    setPriceRange,
    searchTerm,
    setSearchTerm,
  };
};

export default useProducts; 
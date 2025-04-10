// Import data từ các file con
import { productsData } from './products-data';
import { categories } from '../categories';
import { productImages } from './images';
import { productVideos } from './videos';
import { detailDescriptions as productDetailDescriptions } from './detail-descriptions';
import { productVariations } from './variations';

// Import các tiện ích từ thư mục utils
import { filterProductsByPrice, filterProductsByCategory, filterProductsBySearch } from './utils/filter';
import { sortProducts } from './utils/sort';
import { searchProducts as searchProductsWithScore, getProductById as getProductByIdUtil } from './utils/search';

// Hàm để lấy tất cả sản phẩm
export const allProducts = () => {
  return productsData.map(product => {
    // Lấy thông tin chi tiết cho sản phẩm từ các tệp riêng biệt
    const imageData = productImages[product.id] || { main: '', gallery: [] };
    const mainImage = imageData.main || '';
    const gallery = imageData.gallery || [];
    const images = [mainImage, ...gallery];
    const video = productVideos[product.id] || '';
    const detailedDescription = productDetailDescriptions[product.id] || '';
    const variations = productVariations[product.id] || [];

    // Trả về đối tượng sản phẩm đầy đủ
    return {
      ...product,
      img: mainImage,
      images,
      videoUrl: video,
      detailedDescription,
      variations
    };
  });
};

// Hàm để lấy sản phẩm bán chạy
export const topSellingProducts = () => {
  return allProducts().filter(product => product.isTopSelling);
};

// Hàm để lấy sản phẩm mới
export const newProducts = () => {
  return allProducts().filter(product => product.isNew);
};

// Hàm để lấy sản phẩm theo danh mục
export const getProductsByCategory = (categoryId) => {
  return filterProductsByCategory(allProducts(), categoryId);
};

// Hàm để tìm kiếm sản phẩm
export const searchProducts = (query) => {
  return searchProductsWithScore(allProducts(), query);
};

// Hàm để lọc sản phẩm theo giá
export const filterByPrice = (products, min, max) => {
  return filterProductsByPrice(products, min, max);
};

// Hàm để sắp xếp sản phẩm
export const sort = (products, sortType) => {
  return sortProducts(products, sortType);
};

// Hàm để lấy thông tin danh mục
export const getCategories = () => {
  return categories;
};

// Hàm để lấy chi tiết sản phẩm theo ID
export const getProductById = (productId) => {
  return getProductByIdUtil(allProducts(), productId);
};

// Hàm để lấy sản phẩm liên quan
export const getRelatedProducts = (product, limit = 4) => {
  const categoryProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id);
  
  // Nếu không đủ sản phẩm trong cùng danh mục, bổ sung từ sản phẩm bán chạy
  if (categoryProducts.length < limit) {
    const topProducts = topSellingProducts()
      .filter(p => p.id !== product.id && p.categoryId !== product.categoryId);
    
    return [...categoryProducts, ...topProducts].slice(0, limit);
  }
  
  return categoryProducts.slice(0, limit);
};

// Xuất các hàm chính
export {
  filterProductsByCategory,
  filterProductsBySearch,
  filterProductsByPrice,
  sortProducts
};

// Mặc định xuất tất cả
export default allProducts; 
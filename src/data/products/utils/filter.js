// Các hàm lọc sản phẩm
export const filterProductsByPrice = (products, minPrice, maxPrice) => {
  if (!minPrice && !maxPrice) return products;
  
  return products.filter(product => {
    if (minPrice && maxPrice) {
      return product.price >= minPrice && product.price <= maxPrice;
    } else if (minPrice) {
      return product.price >= minPrice;
    } else if (maxPrice) {
      return product.price <= maxPrice;
    }
    return true;
  });
};

export const filterProductsByCategory = (products, category) => {
  if (!category || category === 'all') {
    return products;
  }
  
  return products.filter(product => product.categoryId === category);
};

export const filterProductsBySearch = (products, searchTerm) => {
  if (!searchTerm) {
    return products;
  }
  
  const term = searchTerm.toLowerCase();
  return products.filter(product => {
    const titleMatch = product.title.toLowerCase().includes(term);
    const descMatch = product.description.toLowerCase().includes(term);
    const tagMatch = product.tags && product.tags.some(tag => tag.toLowerCase().includes(term));
    
    return titleMatch || descMatch || tagMatch;
  });
};

export default {
  filterProductsByPrice,
  filterProductsByCategory,
  filterProductsBySearch
}; 
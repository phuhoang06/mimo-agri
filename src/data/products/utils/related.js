// Hàm tìm sản phẩm liên quan
export function getRelatedProducts(products, productId, limit = 4) {
  // Tìm sản phẩm cần so sánh
  const currentProduct = products.find(p => p.id === parseInt(productId));
  if (!currentProduct) return [];

  // Tính điểm tương đồng
  const scores = {};
  
  products.forEach(p => {
    if (p.id === parseInt(productId)) return;
    
    let score = 0;
    
    // Cùng danh mục +3 điểm
    if (p.categoryId === currentProduct.categoryId) {
      score += 3;
    }
    
    // Tìm các tags trùng nhau
    if (p.tags && currentProduct.tags) {
      const commonTags = p.tags.filter(tag => currentProduct.tags.includes(tag));
      score += commonTags.length;
    }
    
    // Điểm cho sản phẩm bán chạy
    if (p.isTopSelling) {
      score += 0.5;
    }
    
    // Điểm cho sản phẩm mới
    if (p.isNew) {
      score += 0.5;
    }
    
    scores[p.id] = { product: p, score };
  });
  
  // Sắp xếp theo điểm
  return Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product)
    .slice(0, limit);
}

export function getSimilarProducts(products, productId, limit = 4) {
  // Tìm sản phẩm cần so sánh
  const currentProduct = products.find(p => p.id === parseInt(productId));
  if (!currentProduct) return [];

  // Các chỉ số để tính điểm tương đồng
  const maxPrice = Math.max(...products.map(p => p.price));
  const minPrice = Math.min(...products.map(p => p.price));
  
  // Tính điểm tương đồng
  const scores = {};
  
  products.forEach(p => {
    if (p.id === parseInt(productId)) return;
    
    let score = 0;
    
    // Điểm về giá (0-1)
    const priceDiff = Math.abs(p.price - currentProduct.price);
    const priceRange = maxPrice - minPrice;
    const priceScore = priceRange > 0 ? 1 - (priceDiff / priceRange) : 1;
    score += priceScore;
    
    // Điểm về danh mục (0 hoặc 2)
    if (p.categoryId === currentProduct.categoryId) {
      score += 2;
    }
    
    // Điểm về tags (0-2)
    if (p.tags && currentProduct.tags) {
      const commonTags = p.tags.filter(tag => currentProduct.tags.includes(tag));
      score += commonTags.length * 0.5; // Mỗi tag trùng +0.5 điểm
    }
    
    scores[p.id] = { product: p, score };
  });
  
  // Sắp xếp theo điểm
  return Object.values(scores)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product)
    .slice(0, limit);
}

export default {
  getRelatedProducts,
  getSimilarProducts
}; 
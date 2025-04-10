// Hàm tìm kiếm sản phẩm
export function searchProducts(products, keyword, limit = 50) {
  if (!keyword) {
    return products.slice(0, limit);
  }

  // Tính điểm tương đồng cho mỗi sản phẩm
  const productScores = {};
  const searchTerms = keyword.toLowerCase().split(' ').filter(Boolean);

  products.forEach(product => {
    let score = 0;

    // Tìm trong tiêu đề (điểm cao)
    searchTerms.forEach(term => {
      if (product.title.toLowerCase().includes(term)) {
        score += 5;
        // Nếu match chính xác với tiêu đề
        if (product.title.toLowerCase() === term) {
          score += 5;
        }
      }
    });

    // Tìm trong mô tả (điểm thấp hơn)
    searchTerms.forEach(term => {
      if (product.description.toLowerCase().includes(term)) {
        score += 3;
      }
    });

    // Tìm trong tags (điểm trung bình)
    if (product.tags) {
      searchTerms.forEach(term => {
        if (product.tags.some(tag => tag.toLowerCase().includes(term))) {
          score += 4;
        }
      });
    }

    // Điểm cho sản phẩm bán chạy
    if (product.isTopSelling) {
      score += 2;
    }

    // Điểm cho sản phẩm mới
    if (product.isNew) {
      score += 1;
    }

    productScores[product.id] = { product, score };
  });

  // Sắp xếp theo điểm
  const scoredProducts = Object.values(productScores)
    .sort((a, b) => b.score - a.score)
    .map(item => item.product);

  // Trả về kết quả có giới hạn
  return scoredProducts.slice(0, limit);
}

export function getProductById(products, productId) {
  return products.find(product => product.id === parseInt(productId));
}

export function getProductsByCategory(products, categoryId) {
  return products.filter(product => product.categoryId === categoryId);
}

export default {
  searchProducts,
  getProductById,
  getProductsByCategory
}; 
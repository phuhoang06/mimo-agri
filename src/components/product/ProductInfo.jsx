import React from 'react';
import { Link } from 'react-router-dom';

const ProductInfo = ({ product, selectedVariant }) => {
  // Lấy giá từ biến thể đã chọn hoặc từ sản phẩm nếu không có biến thể
  const price = selectedVariant ? selectedVariant.price : product.price;
  const oldPrice = selectedVariant ? selectedVariant.oldPrice : product.oldPrice;
  
  // Tính phần trăm giảm giá
  const discountPercent = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  return (
    <div className="product-info">
      <h1 className="product-title mb-3">{product.title}</h1>
      
      <div className="product-price mb-4">
        <span className="current-price text-danger fw-bold fs-4">{price.toLocaleString()}₫</span>
        {oldPrice && (
          <>
            <span className="original-price text-muted text-decoration-line-through ms-2">{oldPrice.toLocaleString()}₫</span>
            <span className="discount-percent text-success ms-2">-{discountPercent}%</span>
          </>
        )}
      </div>
      
      <div className="product-short-description mb-4">
        <p>{product.description}</p>
      </div>

      <div className="product-meta mb-4">
        <div>
          <strong>Danh mục:</strong> {product.categoryId}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 
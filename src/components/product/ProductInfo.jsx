import React from 'react';
import { Link } from 'react-router-dom';

const ProductInfo = ({ product }) => {
  return (
    <div className="product-info">
      <h1 className="product-title mb-3">{product.title}</h1>
      
      <div className="product-price mb-4">
        <span className="current-price text-danger fw-bold fs-4">{product.price.toLocaleString()}₫</span>
        <span className="original-price text-muted text-decoration-line-through ms-2">{product.oldPrice.toLocaleString()}₫</span>
        <span className="discount-percent text-success ms-2">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
      </div>
      
      <div className="product-short-description mb-4">
        <p>{product.description}</p>
      </div>

      <div className="product-meta mb-4">
        <div className="mb-2">
          <strong>Danh mục:</strong> {product.categoryId}
        </div>
        <div>
          <strong>Tình trạng:</strong> Còn hàng
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 
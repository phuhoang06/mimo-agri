import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../../data/products';

const ProductInfo = ({ title, price, oldPrice, categoryId, description }) => {
  // Tính phần trăm giảm giá
  const discountPercent = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;

  // Lấy thông tin danh mục
  const categories = getCategories();
  const category = categories.find(cat => cat.id === categoryId);

  return (
    <div className="product-info">
      <h1 className="product-title mb-3">{title}</h1>
      
      <div className="product-price mb-4">
        <span className="current-price text-danger fw-bold fs-4">{price.toLocaleString()}₫</span>
        {oldPrice && oldPrice > price && (
          <>
            <span className="original-price text-muted text-decoration-line-through ms-2">{oldPrice.toLocaleString()}₫</span>
            <span className="discount-percent text-success ms-2">-{discountPercent}%</span>
          </>
        )}
      </div>
      
      <div className="product-short-description mb-4">
        <p>{description}</p>
      </div>

      <div className="product-meta mb-4">
        <div className="mb-2">
          <strong>Danh mục:</strong>{' '}
          {category ? (
            <Link to={`/san-pham?category=${category.id}`} className="category-link">
              {category.name}
            </Link>
          ) : (
            categoryId
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo; 
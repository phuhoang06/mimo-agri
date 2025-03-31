import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../utils/CartManager';
import { formatCurrency } from '../../utils/format';

function ProductCard({ product, className = "col-6 col-md-4 col-lg-2-4" }) {
  const { addToCart, isCartEnabled } = useCart();
  const navigate = useNavigate();

  // Calculate discount percentage if oldPrice exists
  const discountPercentage = product.oldPrice ? Math.round((1 - product.price / product.oldPrice) * 100) : 0;
  
  // Handle click on mobile devices
  const handleProductClick = (e) => {
    // Navigate to product details
    navigate(`/san-pham/${product.id}`);
  };
  
  // Handle Add to Cart button click
  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent product click event
    if (isCartEnabled) {
      addToCart(product.title, product.price, product.img, 1);
    }
  };

  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}`}></i>
  ));

  return (
    <div className={className}>
      <div 
        className="product-card h-100" 
        onClick={handleProductClick}
      >
        <div className="product-img-wrapper">
          <img 
            src={product.img} 
            className="card-img-top" 
            alt={product.title} 
            loading="lazy"
          />
          
          {/* Badges positioned on the image */}
          <div className="product-badges">
            {product.isTopSelling && (
              <span className="badge-hot">HOT</span>
            )}
            {product.isNew && (
              <span className="badge-new">Mới</span>
            )}
            {discountPercentage > 0 && (
              <span className="badge-discount">-{discountPercentage}%</span>
            )}
          </div>
        </div>
        
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          
          <div className="price-container">
            {/* Current price */}
            <div className="current-price">
              {formatCurrency(product.price)}
            </div>
            
            {/* Old price if exists */}
            {product.oldPrice && product.oldPrice > product.price && (
              <div className="old-price ms-2">
                {formatCurrency(product.oldPrice)}
              </div>
            )}
          </div>
        </div>
        
        {isCartEnabled && (
          <Button 
            variant="outline-success" 
            size="sm" 
            className="mt-auto mb-1 add-to-cart-btn"
            onClick={handleAddToCart}
          >
            <i className="fas fa-cart-plus me-1"></i>
            Thêm vào giỏ
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProductCard; 
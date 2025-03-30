import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../utils/CartManager';

function ProductCard({ product, className = "col-6 col-md-4 col-lg-2-4" }) {
  const { addToCart, isCartEnabled } = useCart();

  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}`}></i>
  ));

  return (
    <div className={className}>
      <Card className="product-card h-100">
        <Link to={`/san-pham/${product.id}`} className="product-img-wrapper">
          <Card.Img variant="top" src={product.img} alt={product.title} loading="lazy" />
        </Link>
        <Card.Body>
          <Link to={`/san-pham/${product.id}`} className="text-decoration-none">
            <Card.Title>{product.title}</Card.Title>
          </Link>
          <div className="price price-container">
            <span className="text-danger fw-bold">{product.price.toLocaleString()}₫</span>
            <span className="text-muted text-decoration-line-through small ms-2">{product.oldPrice.toLocaleString()}₫</span>
            <span className="text-success small ms-2">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
          </div>
          
          {isCartEnabled && (
            <Button variant="outline-success" size="sm" className="mt-2 w-100" onClick={() => addToCart(product.title, product.price, product.img, 1)}>
              <i className="fa fa-cart-plus me-1"></i> Thêm vào giỏ
            </Button>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard; 
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../utils/CartManager';

function ProductCard({ product }) {
  const { addToCart } = useCart();

  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}`}></i>
  ));

  return (
    <div className="col-6 col-md-4 col-lg-3">
      <Card className="product-card h-100">
        <Card.Img variant="top" src={product.img} alt={product.title} loading="lazy" />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <div className="rating">{stars}<span className="small ms-1">({product.reviews})</span></div>
          <p className="card-text small text-muted">{product.sold} đã bán</p>
          <div className="price">
            <span className="text-danger fw-bold">{product.price.toLocaleString()}₫</span>
            <span className="text-muted text-decoration-line-through small ms-2">{product.oldPrice.toLocaleString()}₫</span>
            <span className="text-success small ms-2">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
          </div>
          <Button variant="outline-success" size="sm" className="mt-2 w-100" onClick={() => addToCart(product.title, product.price, product.img)}>
            <i className="fa fa-cart-plus me-1"></i> Thêm vào giỏ
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard;
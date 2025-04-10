import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../../utils/CartManager';
import { useResponsive, getGridClasses } from '../../utils/responsive';

function ProductCard({ product, cols, className }) {
  const { addToCart } = useCart();
  const { isMobile } = useResponsive();

  // Sử dụng getGridClasses nếu có tham số cols, ngược lại sử dụng className mặc định
  const gridClass = cols ? getGridClasses(cols) : className || "col-6 col-sm-4 col-md-3 col-lg-2-4";

  const stars = Array.from({ length: 5 }, (_, i) => (
    <i key={i} className={`fa fa-star ${i < product.rating ? 'text-warning' : 'text-muted'}`}></i>
  ));

  // Đồng bộ chiều cao tiêu đề để giao diện đồng nhất
  const titleStyle = {
    height: isMobile ? '40px' : '48px',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: isMobile ? 2 : 2,
    WebkitBoxOrient: 'vertical',
    marginBottom: '8px'
  };

  // Đồng bộ styles cho giá
  const priceStyle = {
    fontSize: isMobile ? '0.9rem' : '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '4px'
  };

  return (
    <div className={gridClass}>
      <Card className="product-card h-100">
        <div className="product-img-wrapper">
          <Card.Img variant="top" src={product.img} alt={product.title} loading="lazy" />
        </div>
        <Card.Body>
          <Card.Title style={titleStyle}>{product.title}</Card.Title>
          <div className="rating">{stars}<span className="small ms-1">({product.reviews})</span></div>
          <p className="card-text small text-muted">{product.sold} đã bán</p>
          <div className="price" style={priceStyle}>
            <span className="text-danger fw-bold">{product.price.toLocaleString()}₫</span>
            <span className="text-muted text-decoration-line-through small">{product.oldPrice.toLocaleString()}₫</span>
            <span className="text-success small">-{Math.round((1 - product.price / product.oldPrice) * 100)}%</span>
          </div>
          <Button 
            variant="outline-success" 
            size={isMobile ? "sm" : "md"} 
            className="mt-2 w-100" 
            onClick={() => addToCart(product.title, product.price, product.img)}
          >
            <i className="fa fa-cart-plus me-1"></i> {isMobile ? 'Thêm' : 'Thêm vào giỏ'}
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ProductCard; 
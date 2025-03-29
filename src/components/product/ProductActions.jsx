import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';

const ProductActions = ({ 
  product, 
  quantity, 
  isCartEnabled, 
  handleAddToCart, 
  handleBuyNow, 
  handleZaloBuy 
}) => {
  return (
    <div className="product-actions-container">
      {isCartEnabled && (
        <div className="product-actions mb-4">
          <div className="d-grid gap-2 d-md-block">
            <Button 
              variant="primary" 
              className="me-md-2" 
              onClick={handleAddToCart}
            >
              <i className="fa fa-cart-plus me-2"></i>
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      )}
      
      {/* Nút Mua ngay: luôn hiển thị kể cả khi tính năng giỏ hàng bị tắt */}
      <div className="buy-now-btn-wrapper mb-4">
        <Row className="g-2">
          <Col xs={6}>
            <Button 
              variant="success" 
              className="w-100"
              onClick={handleBuyNow}
            >
              <i className="fab fa-facebook-messenger me-2"></i>
              Mua qua Messenger
            </Button>
          </Col>
          <Col xs={6}>
            <Button 
              variant="info" 
              className="w-100 text-white"
              onClick={handleZaloBuy}
            >
              <i className="fas fa-comment-alt me-2"></i>
              Mua qua Zalo
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductActions; 
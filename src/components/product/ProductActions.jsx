import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from '../../components/ui';

const ProductActions = ({ 
  onAddToCart, 
  onBuyNow, 
  onZaloBuy,
  isOutOfStock = false
}) => {
  return (
    <div className="product-actions-container">
      <div className="product-actions mb-4" style={{ display: 'none' }}>
        <div className="d-grid gap-2 d-md-block">
          <Button 
            variant="primary" 
            className="me-md-2" 
            onClick={onAddToCart}
            icon="fa fa-cart-plus"
            useBootstrap={true}
            disabled={isOutOfStock}
          >
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
      
      {/* Nút Mua ngay: Vô hiệu hóa khi hết hàng */}
      <div className="buy-now-btn-wrapper mb-4">
        <Row className="g-1">
          <Col xs={6} className="pe-1">
            <Button 
              variant="success" 
              className="w-100"
              onClick={onBuyNow}
              icon="fab fa-facebook-messenger"
              useBootstrap={true}
              isFullWidth={true}
              disabled={isOutOfStock}
            >
              <span className="d-none d-sm-inline">Mua qua </span>Messenger
            </Button>
          </Col>
          <Col xs={6} className="ps-1">
            <Button 
              variant="info" 
              className="w-100 text-white"
              onClick={onZaloBuy}
              icon="fas fa-comment-alt"
              useBootstrap={true}
              isFullWidth={true}
              disabled={isOutOfStock}
            >
              <span className="d-none d-sm-inline">Mua qua </span>Zalo
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductActions; 
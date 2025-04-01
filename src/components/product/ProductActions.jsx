import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button } from '../../components/ui';

const ProductActions = ({ 
  product, 
  quantity, 
  isCartEnabled, 
  handleAddToCart, 
  handleBuyNow, 
  handleZaloBuy,
  selectedVariant,
  isOutOfStock = false
}) => {
  // Tạo thông tin sản phẩm bao gồm phân loại (nếu có)
  const getProductInfoText = () => {
    if (!product) return '';
    
    const title = product.title;
    const price = selectedVariant ? selectedVariant.price : product.price;
    const variant = selectedVariant ? `\nPhân loại: ${selectedVariant.name}` : '';
    
    return `${title}${variant}\nGiá: ${price.toLocaleString()}đ\nSố lượng: ${quantity}`;
  };

  return (
    <div className="product-actions-container">
      {isCartEnabled && (
        <div className="product-actions mb-4">
          <div className="d-grid gap-2 d-md-block">
            <Button 
              variant="primary" 
              className="me-md-2" 
              onClick={handleAddToCart}
              icon="fa fa-cart-plus"
              useBootstrap={true}
              disabled={isOutOfStock}
            >
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      )}
      
      {/* Nút Mua ngay: Vô hiệu hóa khi hết hàng */}
      <div className="buy-now-btn-wrapper mb-4">
        <Row className="g-2">
          <Col xs={6}>
            <Button 
              variant="success" 
              className="w-100"
              onClick={handleBuyNow}
              icon="fab fa-facebook-messenger"
              useBootstrap={true}
              isFullWidth={true}
              disabled={isOutOfStock}
            >
              Mua qua Messenger
            </Button>
          </Col>
          <Col xs={6}>
            <Button 
              variant="info" 
              className="w-100 text-white"
              onClick={handleZaloBuy}
              icon="fas fa-comment-alt"
              useBootstrap={true}
              isFullWidth={true}
              disabled={isOutOfStock}
            >
              Mua qua Zalo
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductActions; 
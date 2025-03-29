import React from 'react';
import { Row } from 'react-bootstrap';
import Section from '../ui/Section';
import ProductCard from '../product/ProductCard';

function ProductSection({ 
  id, 
  title, 
  products, 
  limit = null, 
  className = '', 
  actionButton, 
  actionButtonText, 
  onActionButtonClick, 
  sectionRef,
  cardClassName = "col-6 col-sm-4 col-md-3 col-lg-2-4"
}) {
  // Xác định số lượng sản phẩm sẽ hiển thị
  const displayProducts = limit ? products.slice(0, limit) : products;
  
  return (
    <Section 
      id={id} 
      title={title} 
      className={className}
      sectionRef={sectionRef}
      actionButton={actionButton}
      actionButtonText={actionButtonText}
      onActionButtonClick={onActionButtonClick}
    >
      <Row className="g-3">
        {displayProducts.map((product, index) => (
          <ProductCard 
            key={index} 
            product={product} 
            className={cardClassName} 
          />
        ))}
      </Row>
    </Section>
  );
}

export default ProductSection; 
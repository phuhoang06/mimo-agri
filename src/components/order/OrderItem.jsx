import React from 'react';
import { Form } from 'react-bootstrap';
import { Button } from '../ui';

function OrderItem({ 
  item, 
  index, 
  isSelected, 
  onSelectionChange, 
  updateQuantity 
}) {
  return (
    <div className="order-item d-flex mb-2 pb-2 border-bottom">
      <Form.Check 
        type="checkbox" 
        className="me-2" 
        checked={isSelected}
        onChange={(e) => onSelectionChange(e.target.checked)}
      />
      <div className="item-img me-2">
        <img 
          src={item.img} 
          alt={item.title} 
          className="img-fluid" 
          style={{width: '50px', height: '50px', objectFit: 'cover'}} 
        />
      </div>
      <div className="item-details flex-grow-1">
        <div className="item-title">{item.title}</div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="item-quantity d-flex align-items-center">
            <Button isQuantityButton onClick={() => updateQuantity(index, -1)}>-</Button>
            <span className="mx-2">{item.quantity}</span>
            <Button isQuantityButton onClick={() => updateQuantity(index, 1)}>+</Button>
          </div>
          <div className="item-price">{(item.price * item.quantity).toLocaleString()}₫</div>
        </div>
      </div>
    </div>
  );
}

export default OrderItem; 
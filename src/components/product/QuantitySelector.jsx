import React from 'react';
import { Button } from 'react-bootstrap';

const QuantitySelector = ({ quantity, setQuantity }) => {
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="quantity-selector d-flex align-items-center mb-3">
      <span className="me-3">Số lượng:</span>
      <div className="input-group" style={{ width: '120px' }}>
        <Button variant="outline-secondary" className="btn-sm" onClick={decrementQuantity}>-</Button>
        <input 
          type="number" 
          className="form-control text-center" 
          value={quantity} 
          onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
        />
        <Button variant="outline-secondary" className="btn-sm" onClick={incrementQuantity}>+</Button>
      </div>
    </div>
  );
};

export default QuantitySelector; 
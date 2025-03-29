import React from 'react';
import { Form } from 'react-bootstrap';

function PriceRange({
  min,
  max,
  onMinChange,
  onMaxChange,
  className = 'mb-3',
  ...props
}) {
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    onMinChange(value);
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value) || 0;
    onMaxChange(value);
  };

  return (
    <div className={`price-range ${className}`} {...props}>
      <div className="d-flex justify-content-between">
        <Form.Control 
          type="number" 
          placeholder="Từ" 
          value={min}
          onChange={handleMinChange}
          className="me-2"
        />
        <Form.Control 
          type="number" 
          placeholder="Đến" 
          value={max}
          onChange={handleMaxChange}
        />
      </div>
    </div>
  );
}

export default PriceRange;

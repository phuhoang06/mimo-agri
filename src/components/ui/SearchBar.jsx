import React from 'react';
import { Form, Button } from 'react-bootstrap';

function SearchBar({
  placeholder = 'Tìm kiếm...',
  value,
  onChange,
  onSubmit,
  buttonText,
  buttonIcon = 'fas fa-search',
  className = '',
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit();
  };

  return (
    <Form className={`input-group search-bar ${className}`} onSubmit={handleSubmit} {...props}>
      <Form.Control 
        type="text" 
        className="search-input" 
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
      <Button className="btn-search" type="submit" title={buttonText || "Tìm kiếm"}>
        <i className={buttonIcon}></i>
        {buttonText && <span className="ms-2">{buttonText}</span>}
      </Button>
    </Form>
  );
}

export default SearchBar;

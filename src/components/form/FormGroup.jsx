import React from 'react';
import { Form } from 'react-bootstrap';

function FormGroup({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  required = false,
  className = 'mb-3',
  options = [],
  helpText,
  children,
  ...props
}) {
  return (
    <Form.Group className={className}>
      {label && <Form.Label>{label}</Form.Label>}
      
      {children ? (
        children
      ) : type === 'select' ? (
        <Form.Select 
          id={id} 
          value={value} 
          onChange={onChange} 
          required={required}
          {...props}
        >
          <option value="">{placeholder || `Chọn ${label}`}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control 
          type={type} 
          id={id} 
          placeholder={placeholder} 
          value={value} 
          onChange={onChange} 
          required={required} 
          {...props}
        />
      )}
      
      {helpText && <Form.Text>{helpText}</Form.Text>}
    </Form.Group>
  );
}

export default FormGroup;
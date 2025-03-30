import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, ListGroup, Image } from 'react-bootstrap';
import { searchProducts } from '../../utils/products';

/**
 * Component hiển thị ô tìm kiếm với chức năng gợi ý sản phẩm
 */
const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Xử lý submit form tìm kiếm
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/san-pham?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  // Xử lý khi thay đổi giá trị trong ô tìm kiếm
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setHighlightedIndex(-1);
    
    // Hiển thị gợi ý khi có ít nhất 2 ký tự
    if (value.trim().length >= 2) {
      const results = searchProducts(value, 5);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Xử lý phím mũi tên để điều hướng qua các gợi ý
  const handleKeyDown = (e) => {
    // Phím mũi tên xuống
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => 
        prevIndex < suggestions.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
    // Phím mũi tên lên
    else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : -1
      );
    }
    // Phím Enter khi đang chọn một gợi ý
    else if (e.key === 'Enter' && highlightedIndex >= 0) {
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
    // Phím Esc để ẩn gợi ý
    else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  // Xử lý khi chọn một gợi ý
  const handleSuggestionClick = (product) => {
    navigate(`/san-pham/${product.id}`);
    setShowSuggestions(false);
    setSearchTerm('');
  };

  // Ẩn gợi ý khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Định dạng giá tiền theo VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="search-container position-relative" ref={searchRef}>
      <Form className="d-flex" onSubmit={handleSearch}>
        <Form.Control 
          type="text" 
          className="search-input rounded-pill py-2 ps-3"
          placeholder="Nhập thông tin tìm kiếm..." 
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(searchTerm.trim().length >= 2)}
          style={{ borderRight: 'none', boxShadow: 'none', borderColor: '#28a745' }}
        />
        <Button 
          className="btn-search rounded-circle position-absolute" 
          type="submit" 
          title="Tìm kiếm"
          style={{ right: '5px', top: '4px', backgroundColor: '#28a745', border: 'none', width: '32px', height: '32px', padding: '0' }}
        >
          <i className="fas fa-search"></i>
        </Button>
      </Form>
      
      {showSuggestions && suggestions.length > 0 && (
        <ListGroup 
          className="position-absolute w-100 mt-1 shadow-sm search-suggestions"
          style={{ 
            maxHeight: '350px', 
            overflowY: 'auto', 
            borderRadius: '8px', 
            zIndex: 9999,
            animation: 'fadeInDown 0.3s ease-out',
            border: '1px solid rgba(40, 167, 69, 0.2)'
          }}
        >
          {suggestions.map((product, index) => (
            <ListGroup.Item 
              key={product.id}
              action
              onClick={() => handleSuggestionClick(product)}
              className={`d-flex align-items-center py-2 search-suggestion-item ${index === highlightedIndex ? 'highlighted' : ''}`}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <div className="suggestion-image me-2" style={{ width: '45px', height: '45px', minWidth: '45px' }}>
                <Image 
                  src={product.img} 
                  alt={product.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '2px' }}
                  className="search-product-thumbnail"
                />
              </div>
              <div className="suggestion-content d-flex flex-column flex-grow-1 overflow-hidden">
                <div className="suggestion-title text-truncate fw-semibold">{product.title}</div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="suggestion-price text-danger fw-bold">{formatPrice(product.price)}</span>
                  {product.oldPrice && (
                    <small className="text-muted text-decoration-line-through">
                      {formatPrice(product.oldPrice)}
                    </small>
                  )}
                </div>
              </div>
            </ListGroup.Item>
          ))}
          <ListGroup.Item 
            action
            onClick={handleSearch}
            className="text-center view-all-results"
          >
            <i className="fas fa-search me-1"></i>
            Xem tất cả kết quả cho "<span className="fw-bold">{searchTerm}</span>"
          </ListGroup.Item>
        </ListGroup>
      )}
    </div>
  );
};

export default SearchBox; 
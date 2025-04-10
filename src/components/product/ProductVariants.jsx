import React, { useState, useEffect } from 'react';

const ProductVariants = ({ product, selectedVariant, onVariantChange }) => {
  // Khởi tạo state 
  const [selectedOptions, setSelectedOptions] = useState({});
  const [availableVariants, setAvailableVariants] = useState([]);
  
  // Kiểm tra và lấy dữ liệu variations nếu có
  const hasVariations = product && product.variations && 
                      product.variations.options && 
                      product.variations.variants;
  
  const options = hasVariations ? product.variations.options : [];
  const variants = hasVariations ? product.variations.variants : [];

  // Debug sản phẩm
  console.log("Product:", product);
  console.log("Product variations:", product.variations);
  
  // Tìm biến thể dựa trên các tùy chọn được chọn
  const findVariantByOptions = () => {
    if (!hasVariations || Object.keys(selectedOptions).length !== options.length) return null;
    
    const selectedAttributes = options.map(option => selectedOptions[option.name]);
    
    return variants.find(variant => {
      return variant.attributes.every((attr, index) => attr === selectedAttributes[index]);
    });
  };
  
  // Cập nhật availableVariants khi selectedOptions thay đổi
  useEffect(() => {
    if (!hasVariations) return;
    
    // Nếu không có tùy chọn nào được chọn, tất cả các biến thể đều có sẵn
    if (Object.keys(selectedOptions).length === 0) {
      setAvailableVariants(variants);
      // Khi tất cả tùy chọn bị hủy, quay lại biến thể mặc định (biến thể đầu tiên)
      if (variants.length > 0) {
        onVariantChange(variants[0]);
      }
      return;
    }
    
    // Lọc các biến thể dựa trên các tùy chọn đã chọn
    const filteredVariants = variants.filter(variant => {
      return Object.entries(selectedOptions).every(([optionName, selectedValue]) => {
        const optionIndex = options.findIndex(opt => opt.name === optionName);
        return optionIndex === -1 || variant.attributes[optionIndex] === selectedValue;
      });
    });
    
    setAvailableVariants(filteredVariants);
    
    // Tìm và chọn biến thể phù hợp nếu tất cả các tùy chọn đã được chọn
    const matchedVariant = findVariantByOptions();
    if (matchedVariant) {
      onVariantChange(matchedVariant);
    } else if (filteredVariants.length > 0) {
      // Nếu không tìm thấy biến thể phù hợp chính xác với tất cả các tùy chọn
      // nhưng có các biến thể khớp một phần, chọn biến thể đầu tiên trong danh sách
      onVariantChange(filteredVariants[0]);
    }
  }, [selectedOptions, hasVariations, variants, options, onVariantChange]);
  
  // Khởi tạo các tùy chọn mặc định khi component được tải
  useEffect(() => {
    if (!hasVariations) return;
    
    if (selectedVariant) {
      // Nếu đã có selectedVariant, thiết lập các tùy chọn tương ứng
      const newSelectedOptions = {};
      selectedVariant.attributes.forEach((attr, index) => {
        if (options[index]) {
          newSelectedOptions[options[index].name] = attr;
        }
      });
      setSelectedOptions(newSelectedOptions);
    } else if (variants.length > 0) {
      // Nếu chưa có selectedVariant, chọn biến thể đầu tiên
      const defaultVariant = variants[0];
      const newSelectedOptions = {};
      defaultVariant.attributes.forEach((attr, index) => {
        if (options[index]) {
          newSelectedOptions[options[index].name] = attr;
        }
      });
      setSelectedOptions(newSelectedOptions);
      onVariantChange(defaultVariant);
    }
  }, [hasVariations, selectedVariant, variants, options, onVariantChange]);
  
  // Xử lý khi người dùng chọn một tùy chọn
  const handleOptionSelect = (optionName, value) => {
    setSelectedOptions(prev => {
      // Nếu giá trị đã được chọn trước đó, hủy chọn nó
      if (prev[optionName] === value) {
        const newOptions = { ...prev };
        delete newOptions[optionName];
        return newOptions;
      }
      // Ngược lại, chọn giá trị mới
      return {
        ...prev,
        [optionName]: value
      };
    });
  };
  
  // Kiểm tra xem một giá trị tùy chọn có sẵn không (dựa trên các tùy chọn khác đã chọn)
  const isOptionValueAvailable = (optionName, optionValue) => {
    // Nếu không có tùy chọn nào được chọn, tất cả đều có sẵn
    if (Object.keys(selectedOptions).length === 0) return true;
    
    // Tạo một bộ tùy chọn thử nghiệm
    const testOptions = { ...selectedOptions, [optionName]: optionValue };
    
    // Kiểm tra xem có biến thể nào khớp với bộ tùy chọn này không
    return variants.some(variant => {
      return options.every((option, index) => {
        // Bỏ qua các tùy chọn chưa được chọn
        if (!testOptions[option.name]) return true;
        return variant.attributes[index] === testOptions[option.name];
      });
    });
  };
  
  // Lấy thông tin tồn kho của biến thể
  const getStockInfo = (variant) => {
    if (!variant || !variant.stock) return { status: 'unknown', text: 'Đang cập nhật' };
    
    if (variant.stock <= 0) return { status: 'out-of-stock', text: 'Hết hàng' };
    if (variant.stock < 10) return { status: 'low-stock', text: `Còn ${variant.stock} sản phẩm` };
    return { status: 'in-stock', text: 'Còn hàng' };
  };
  
  // Lấy biến thể hiển thị hình ảnh
  const getVariantImage = () => {
    if (selectedVariant && selectedVariant.image) {
      return selectedVariant.image;
    }
    return product.img; // Sử dụng hình ảnh mặc định của sản phẩm
  };

  // Tính % giảm giá
  const calculateDiscount = (variant) => {
    if (!variant || !variant.oldPrice || variant.oldPrice <= variant.price) return null;
    return Math.round((1 - variant.price / variant.oldPrice) * 100);
  };
  
  // Nếu không có variations, không hiển thị gì cả
  if (!hasVariations) {
    return null;
  }
  
  // Lấy thông tin stock của biến thể đã chọn
  const stockInfo = selectedVariant ? getStockInfo(selectedVariant) : { status: 'unknown', text: 'Đang cập nhật' };
  const discountPercent = selectedVariant ? calculateDiscount(selectedVariant) : null;
  
  return (
    <div className="product-variations mb-4">
      {/* Hiển thị hình ảnh biến thể nếu có */}
      {selectedVariant && selectedVariant.image && (
        <div className="variant-image mb-3">
          <img 
            src={getVariantImage()} 
            alt={`${product.title} - ${selectedVariant.attributes.join(' - ')}`}
            className="img-fluid variant-thumbnail"
            style={{ maxHeight: '80px', width: 'auto' }}
          />
        </div>
      )}
      
      {/* Hiển thị các nhóm tùy chọn */}
      {options.map((option, optionIndex) => (
        <div key={optionIndex} className="variation-option-group mb-3">
          <h5 className="option-title mb-2 d-flex align-items-center">
            <span>{option.name}:</span>
            <small className="ms-2 text-muted" style={{ fontSize: '12px', fontWeight: 'normal' }}>
              (Click vào tùy chọn đã chọn để hủy)
            </small>
          </h5>
          <div className="option-values d-flex flex-wrap gap-2">
            {option.values.map((value, valueIndex) => {
              const isAvailable = isOptionValueAvailable(option.name, value);
              const isSelected = selectedOptions[option.name] === value;
              
              return (
                <div
                  key={valueIndex}
                  className={`option-value p-2 border rounded ${isSelected ? 'active bg-primary text-white' : ''} 
                              ${!isAvailable ? 'disabled opacity-50' : ''}`}
                  onClick={() => isAvailable && handleOptionSelect(option.name, value)}
                  style={{ 
                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                    minWidth: '60px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  title={isSelected ? `Nhấn để hủy chọn "${value}"` : `Chọn "${value}"`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {/* Hiển thị thông tin biến thể đã chọn */}
      {selectedVariant && (
        <div className="selected-variant-info mt-4 p-3 border rounded bg-light">
          {/* Hiển thị giá cả */}
          <div className="variant-price mb-2">
            <span className="current-price text-danger fw-bold fs-4">
              {selectedVariant.price.toLocaleString()}₫
            </span>
            {selectedVariant.oldPrice && selectedVariant.oldPrice > selectedVariant.price && (
              <>
                <span className="original-price text-muted text-decoration-line-through ms-2">
                  {selectedVariant.oldPrice.toLocaleString()}₫
                </span>
                {discountPercent && (
                  <span className="discount-percent text-success ms-2 fw-bold">
                    -{discountPercent}%
                  </span>
                )}
              </>
            )}
          </div>
          
          {/* Hiển thị trạng thái tồn kho */}
          <div className={`stock-status ${stockInfo.status} mb-2`}>
            <i className={`bi ${stockInfo.status === 'in-stock' ? 'bi-check-circle-fill text-success' : 
                               stockInfo.status === 'low-stock' ? 'bi-exclamation-circle-fill text-warning' : 
                               'bi-x-circle-fill text-danger'}`}></i>
            <span className={`ms-2 ${stockInfo.status === 'in-stock' ? 'text-success' : 
                                      stockInfo.status === 'low-stock' ? 'text-warning' : 
                                      'text-danger'}`}>
              {stockInfo.text}
            </span>
          </div>
          
          {/* Hiển thị ID sản phẩm */}
          <div className="variant-id text-muted">
            <small>Mã sản phẩm: {selectedVariant.id}</small>
          </div>
          
          {/* Hiển thị các thuộc tính đã chọn */}
          <div className="selected-attributes mt-2">
            <small className="text-muted">
              {selectedVariant.attributes.map((attr, index) => (
                <span key={index}>
                  {options[index]?.name}: <strong>{attr}</strong>
                  {index < selectedVariant.attributes.length - 1 ? ' | ' : ''}
                </span>
              ))}
            </small>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants; 
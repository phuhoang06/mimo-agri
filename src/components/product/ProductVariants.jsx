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
  
  // Nếu không có variations, không hiển thị gì cả
  if (!hasVariations) {
    return null;
  }
  
  return (
    <div className="product-variations mb-4">
      {options.map((option, optionIndex) => (
        <div key={optionIndex} className="variation-option-group mb-3">
          <h5 className="option-title mb-2">
            {option.name}:
            <small className="ms-2 text-muted" style={{ fontSize: '12px', fontWeight: 'normal' }}>
              (Click vào tùy chọn đã chọn để hủy)
            </small>
          </h5>
          <div className="option-values">
            {option.values.map((value, valueIndex) => {
              const isAvailable = isOptionValueAvailable(option.name, value);
              const isSelected = selectedOptions[option.name] === value;
              
              return (
                <div
                  key={valueIndex}
                  className={`option-value ${isSelected ? 'active' : ''} ${!isAvailable ? 'disabled' : ''}`}
                  onClick={() => isAvailable && handleOptionSelect(option.name, value)}
                  style={{ cursor: isAvailable ? 'pointer' : 'not-allowed' }}
                  title={isSelected ? `Nhấn để hủy chọn "${value}"` : `Chọn "${value}"`}
                >
                  {value}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      
      {selectedVariant && (
        <div className="selected-variant-info mt-3">
          <div className="variant-price mb-2">
            <span className="current-price text-danger fw-bold">
              {selectedVariant.price.toLocaleString()}₫
            </span>
            {selectedVariant.oldPrice && (
              <>
                <span className="original-price text-muted text-decoration-line-through ms-2">
                  {selectedVariant.oldPrice.toLocaleString()}₫
                </span>
                <span className="discount-percent text-success ms-2">
                  -{Math.round((1 - selectedVariant.price / selectedVariant.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductVariants; 
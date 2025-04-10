import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';

// Hàm xử lý định dạng văn bản đặc biệt
const formatDescription = (text) => {
  if (!text) return '';
  
  // Xử lý biểu tượng emoji và ký hiệu đặc biệt
  const formattedText = text
    // Xử lý emoji
    .replace(/🌾/g, '<span class="emoji">🌾</span>')
    .replace(/🔥/g, '<span class="emoji">🔥</span>')
    .replace(/##\s/g, '<hr class="section-divider"/>')
    .replace(/###\s/g, '<hr class="section-divider light"/>')
    // Đánh dấu tiêu đề và đoạn quan trọng
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Xử lý các ký hiệu phân cách
    .replace(/\|\s/g, '<span class="separator">| </span>')
    // Xử lý hashtag
    .replace(/#([a-zA-Z0-9_]+)/g, '<span class="hashtag">#$1</span>');
  
  return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
};

// CSS cho định dạng mô tả
const styles = `
.emoji {
  font-size: 1.2em;
  display: inline-block;
  margin: 0 2px;
  vertical-align: middle;
}
.section-divider {
  margin: 15px 0;
  border-top: 1px solid #e0e0e0;
}
.section-divider.light {
  margin: 10px 0;
  border-top: 1px dashed #e0e0e0;
}
.separator {
  color: #888;
  font-weight: bold;
  margin: 0 4px;
}
.description-tab-content strong {
  color: #28a745;
  font-weight: bold;
}
.hashtag {
  color: #007bff;
  font-weight: 500;
}
.description-tab-content {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.6;
  color: #333;
}
.formatted-description {
  padding: 15px 5px;
}
`;

const ProductTabs = ({ product }) => {
  // Thêm CSS vào document khi component được mount
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.type = 'text/css';
    styleElement.appendChild(document.createTextNode(styles));
    document.head.appendChild(styleElement);
    
    // Cleanup khi component unmount
    return () => {
      if (styleElement && document.head.contains(styleElement)) {
        document.head.removeChild(styleElement);
      }
    };
  }, []);

  return (
    <div className="product-details-tabs mt-5">
      <ul className="nav nav-tabs" id="productTabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button 
            className="nav-link active" 
            id="description-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#description" 
            type="button" 
            role="tab" 
            aria-controls="description" 
            aria-selected="true"
          >
            Mô tả chi tiết
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button 
            className="nav-link" 
            id="reviews-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#reviews" 
            type="button" 
            role="tab" 
            aria-controls="reviews" 
            aria-selected="false"
          >
            Đánh giá
          </button>
        </li>
      </ul>
      
      <div className="tab-content p-4 border border-top-0 rounded-bottom" id="productTabsContent">
        <div 
          className="tab-pane fade show active description-tab-content" 
          id="description" 
          role="tabpanel" 
          aria-labelledby="description-tab"
        >
          <div className="formatted-description" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {formatDescription(product.detailedDescription)}
          </div>
        </div>
        
        <div 
          className="tab-pane fade" 
          id="reviews" 
          role="tabpanel" 
          aria-labelledby="reviews-tab"
        >
          <p>Chưa có đánh giá nào cho sản phẩm này.</p>
          <Button variant="outline-primary">Viết đánh giá</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductTabs; 
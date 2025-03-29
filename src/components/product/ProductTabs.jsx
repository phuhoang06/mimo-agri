import React from 'react';
import { Button } from 'react-bootstrap';

const ProductTabs = ({ product }) => {
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
            id="specifications-tab" 
            data-bs-toggle="tab" 
            data-bs-target="#specifications" 
            type="button" 
            role="tab" 
            aria-controls="specifications" 
            aria-selected="false"
          >
            Thông số kỹ thuật
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
          className="tab-pane fade show active" 
          id="description" 
          role="tabpanel" 
          aria-labelledby="description-tab"
          dangerouslySetInnerHTML={{ __html: product.detailedDescription }}
        >
        </div>
        
        <div 
          className="tab-pane fade" 
          id="specifications" 
          role="tabpanel" 
          aria-labelledby="specifications-tab"
        >
          {product.specifications ? (
            <table className="table table-striped">
              <tbody>
                {product.specifications.map((spec, idx) => (
                  <tr key={idx}>
                    <th style={{ width: '30%' }}>{spec.name}</th>
                    <td>{spec.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Không có thông số kỹ thuật cho sản phẩm này.</p>
          )}
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
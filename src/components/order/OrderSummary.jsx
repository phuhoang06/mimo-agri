import React from 'react';

function OrderSummary({ total, shippingFee = 0 }) {
  return (
    <div className="order-summary">
      <div className="d-flex justify-content-between mb-2">
        <span>Tạm tính:</span>
        <span>{total.toLocaleString()}₫</span>
      </div>
      <div className="d-flex justify-content-between mb-2">
        <span>Phí vận chuyển:</span>
        <span>{shippingFee.toLocaleString()}₫</span>
      </div>
      <div className="d-flex justify-content-between fw-bold">
        <span>Tổng cộng:</span>
        <span className="text-danger">{(total + shippingFee).toLocaleString()}₫</span>
      </div>
    </div>
  );
}

export default OrderSummary; 
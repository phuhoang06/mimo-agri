import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from '../store/slices/cartSlice';

const Cart = () => {
  const { items, totalAmount, totalCount } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <h2>Giỏ hàng của bạn</h2>
        <p>Giỏ hàng của bạn đang trống</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      <p>Bạn có {totalCount} sản phẩm trong giỏ hàng</p>
      
      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            {item.image && <img src={item.image} alt={item.name} className="cart-item-image" />}
            <div className="cart-item-details">
              <h3>{item.name}</h3>
              <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</p>
            </div>
            <div className="cart-item-actions">
              <button 
                className="btn btn-sm btn-secondary" 
                onClick={() => dispatch(decreaseQuantity(item.id))}
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                className="btn btn-sm btn-secondary" 
                onClick={() => dispatch(increaseQuantity(item.id))}
              >
                +
              </button>
              <button 
                className="btn btn-sm btn-danger" 
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <h3>Tổng cộng</h3>
        <p>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</p>
        <button 
          className="btn btn-danger me-2" 
          onClick={() => dispatch(clearCart())}
        >
          Xóa giỏ hàng
        </button>
        <button className="btn btn-primary">
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart; 
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/reduxHooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/slices/orderSlice';

const CartComponent = () => {
  const { cart } = useAppSelector(state => state.order);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h3>Giỏ hàng trống</h3>
        <p>Vui lòng thêm sản phẩm vào giỏ hàng.</p>
        <Link to="/products" className="btn btn-primary">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h2>Giỏ hàng của bạn</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="cart-item-details">
              <h4>{item.name}</h4>
              <p className="price">{item.price.toLocaleString('vi-VN')} VNĐ</p>
            </div>
            <div className="cart-item-actions">
              <div className="quantity-control">
                <button 
                  onClick={() => handleQuantityChange(item.id, Math.max(1, item.quantity - 1))}
                  className="btn btn-sm btn-outline-secondary"
                >
                  -
                </button>
                <span className="quantity">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="btn btn-sm btn-outline-secondary"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => handleRemoveItem(item.id)}
                className="btn btn-sm btn-danger"
              >
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <div className="cart-total">
          <span>Tổng cộng:</span>
          <span className="total-price">
            {calculateTotal().toLocaleString('vi-VN')} VNĐ
          </span>
        </div>
        <div className="cart-actions">
          <button onClick={handleClearCart} className="btn btn-outline-danger">
            Xóa giỏ hàng
          </button>
          <Link to="/order" className="btn btn-primary">
            Tiến hành đặt hàng
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartComponent; 
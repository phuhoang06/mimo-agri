import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useCart } from '../utils/CartManager';
import { Link } from 'react-router-dom';

function CartModal() {
  const { cart, showModal, hideCart, removeFromCart, clearCart, groupItems, updateQuantity } = useCart();

  return (
    <Modal show={showModal} onHide={hideCart} size="lg">
      <Modal.Header closeButton>
        <Modal.Title><i className="fas fa-shopping-cart me-2"></i>Giỏ hàng</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cart.length === 0 ? (
          <p className="text-center text-muted">Giỏ hàng trống</p>
        ) : (
          <ul className="list-group">
            {groupItems().map((item, index) => (
              <li className="list-group-item" key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={item.img} alt={item.title} className="me-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                    <div className="flex-grow-1">
                      <h6 className="mb-0">{item.title}</h6>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="input-group" style={{ width: '120px' }}>
                          <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(index, -1)}>-</Button>
                          <input type="number" className="form-control form-control-sm text-center" value={item.quantity} min="1" max="99" onChange={(e) => updateQuantity(index, parseInt(e.target.value))} />
                          <Button variant="outline-secondary" size="sm" onClick={() => updateQuantity(index, 1)}>+</Button>
                        </div>
                        <div className="text-success">{(item.price * item.quantity).toLocaleString()}₫</div>
                      </div>
                    </div>
                  </div>
                  <Button variant="danger" size="sm" onClick={() => removeFromCart(index)}><i className="fas fa-trash"></i></Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={clearCart}><i className="fas fa-trash me-2"></i>Xóa giỏ hàng</Button>
        <Button as={Link} to="/order" variant="success"><i className="fas fa-check me-2"></i>Tiến hành đặt hàng</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CartModal;
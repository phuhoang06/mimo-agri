import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Button } from 'react-bootstrap';
import { useCart } from '../../utils/CartManager';

function MainMenu() {
  const { cart, showCart } = useCart();

  return (
    <div className="main-menu bg-success">
      <Container>
        <div className="d-flex align-items-center justify-content-between">
          <Nav className="horizontal-nav">
            <Nav.Link as={Link} to="/" className="text-white">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/gioi-thieu" className="text-white">Giới thiệu</Nav.Link>
            <Nav.Link as={Link} to="/san-pham" className="text-white">Cửa hàng</Nav.Link>
            <Nav.Link as={Link} to="/kien-thuc" className="text-white">Kiến Thức</Nav.Link>
            <Nav.Link as={Link} to="/huong-dan-mua-hang" className="text-white">Hướng dẫn mua hàng</Nav.Link>
            <Nav.Link as={Link} to="/dang-ky-mua-buon" className="text-white">Đăng ký mua buôn</Nav.Link>
            <Nav.Link as={Link} to="/lien-he" className="text-white">Liên Hệ</Nav.Link>
          </Nav>
          
          <div>
            <Button id="cartButton" variant="outline-light" className="position-relative" onClick={showCart}>
              <i className="fas fa-shopping-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.length}</span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default MainMenu; 
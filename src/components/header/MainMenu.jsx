import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useCart } from '../../utils/CartManager';
import { useResponsive } from '../../utils/responsive';

function MainMenu({ mobile = false, onItemClick }) {
  const { cart, showCart } = useCart();
  const { isMobile } = useResponsive();

  const menuItems = [
    { title: 'Trang chủ', path: '/' },
    { title: 'Sản phẩm', path: '/san-pham' },
    { title: 'Hướng dẫn mua hàng', path: '/guide' },
    { title: 'Chính sách', path: '/policy' },
    { title: 'Liên hệ', path: '/contact' },
    { title: 'Về chúng tôi', path: '/about' },
  ];

  // Tạo menu item dựa vào mobile hay desktop mode
  const renderMenuItem = (item, index) => {
    if (mobile) {
      return (
        <Nav.Item key={index}>
          <Link 
            to={item.path} 
            className="nav-link py-2"
            onClick={onItemClick}
          >
            {item.title}
          </Link>
        </Nav.Item>
      );
    }
    
    return (
      <Nav.Item key={index}>
        <Link to={item.path} className="nav-link">
          {item.title}
        </Link>
      </Nav.Item>
    );
  };

  if (mobile) {
    // Menu cho mobile
    return (
      <Nav className="flex-column mobile-main-menu">
        {menuItems.map((item, index) => renderMenuItem(item, index))}
      </Nav>
    );
  }

  // Menu cho desktop
  return (
    <div className="main-menu bg-success">
      <Container fluid className="px-3 px-md-4">
        <Navbar expand="lg" variant="dark" className="p-0">
          <Nav className="me-auto">
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </Nav>
          
          <div>
            <Button id="cartButton" variant="outline-light" className="position-relative" onClick={showCart}>
              <i className="fas fa-shopping-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.length}</span>
            </Button>
          </div>
        </Navbar>
      </Container>
    </div>
  );
}

export default MainMenu; 
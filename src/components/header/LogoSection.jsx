import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { useResponsive } from '../../utils/responsive';
import logo from '../../assets/logo.svg';
import shiperImg from '../../assets/icon/shiper.png';

function LogoSection({ showMenuButton, onMenuClick }) {
  const { isMobile, isTablet } = useResponsive();

  return (
    <div className="logo-section py-2">
      <Container fluid className="px-3 px-md-4">
        <Row className="align-items-center">
          {/* Nút menu cho mobile */}
          {showMenuButton && (
            <Col xs={2} className="d-flex d-md-none">
              <Button variant="outline-secondary" onClick={onMenuClick} aria-label="Menu">
                <i className="fa fa-bars"></i>
              </Button>
            </Col>
          )}
          
          {/* Logo */}
          <Col xs={showMenuButton ? 4 : 6} md={3} className="logo-container">
            <Link to="/" className="d-flex align-items-center">
              <img src={logo} alt="MIMO Agriculture" className="logo" style={{maxHeight: isMobile ? '40px' : '50px'}} />
              {!isMobile && <span className="brand-name ms-2">MIMO Agriculture</span>}
            </Link>
          </Col>
          
          {/* Thanh tìm kiếm */}
          <Col xs={showMenuButton ? 6 : 6} md={5} className="search-container">
            <InputGroup>
              <Form.Control
                placeholder="Tìm kiếm sản phẩm..."
                aria-label="Tìm kiếm sản phẩm"
              />
              <Button variant="outline-success">
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup>
          </Col>
          
          {/* Icons - Chỉ hiển thị trên desktop */}
          {!isMobile && (
            <Col md={4} className="d-none d-md-flex justify-content-end">
              <div className="header-icons">
                <Link to="/account" className="header-icon">
                  <i className="fa fa-user-circle"></i>
                  <span className="icon-text">Tài khoản</span>
                </Link>
                <Link to="/favorites" className="header-icon">
                  <i className="fa fa-heart"></i>
                  <span className="icon-text">Yêu thích</span>
                </Link>
                <button className="header-icon border-0 bg-transparent" data-bs-toggle="modal" data-bs-target="#cartModal">
                  <i className="fa fa-shopping-cart"></i>
                  <span className="icon-text">Giỏ hàng</span>
                </button>
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default LogoSection; 
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import logoImg from '../../assets/icon/logo.png';
import shiper from '../../assets/icon/shiper.png';

function LogoSection({ isMobile, mobileMenuOpen, toggleMobileMenu }) {
  return (
    <Container className="py-2">
      <div className="row align-items-center">
        <div className="col-6 col-md-2 col-lg-2 mb-2 mb-md-0">
          <div className="logo-wrap">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src={logoImg} alt="Logo" className="logo-img me-2" />
              <span className="fw-bold text-success fs-5 mb-0">Mimo Agri</span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-5 col-lg-5 order-3 order-md-2">
          <Form className="input-group search-bar mx-md-2 mobile-search-container">
            <Form.Control type="text" className="search-input" placeholder="Nhập thông tin tìm kiếm..." />
            <Button className="btn-search" type="submit" title="Tìm kiếm">
              <i className="fas fa-search"></i>
            </Button>
            
            {isMobile && (
              <div className="mobile-menu-button" onClick={toggleMobileMenu}>
                <i className="fas fa-bars"></i>
              </div>
            )}
            {isMobile && mobileMenuOpen && (
              <div className="mobile-menu">
                <ul className="mobile-nav-links">
                  <li><a href="/">Trang chủ</a></li>
                  <li><a href="/san-pham">Sản phẩm</a></li>
                  <li><a href="/tai-lieu-ky-thuat">Tài liệu kỹ thuật</a></li>
                  <li><a href="/lien-he-mua-hang">Liên Hệ Mua Hàng</a></li>
                </ul>
              </div>
            )}
          </Form>
        </div>
        <div className="col-6 col-md-3 col-lg-3 text-center order-md-3 d-none d-md-block">
          <div className="shipping-wrap d-flex align-items-center">
            <img src={shiper} alt="Shipping" className="shipping-icon me-2" style={{ maxWidth: '24px' }} />
            <span className="shipping-text small">Miễn phí vận chuyển cho đơn hàng từ 200k</span>
          </div>
        </div>
        <div className="col-6 col-md-2 col-lg-2 text-end order-2 order-md-4 mb-2 mb-md-0">
          <div className="hotline-wrap d-flex flex-column align-items-end">
            <div className="d-flex align-items-center">
              <i className="fas fa-phone icon-color me-1"></i>
              <span className="hotline-label">Hotline</span>
            </div>
            <span className="hotline-number">085 399 1995</span>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default LogoSection; 
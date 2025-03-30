import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import logoImg from '../../assets/icon/logo.png';
import shiper from '../../assets/icon/shiper.png';
import SearchBox from './SearchBox';

function LogoSection({ isMobile, mobileMenuOpen, toggleMobileMenu }) {
  return (
    <Container fluid className="py-3 border-bottom">
      <Row className="align-items-center mx-2 mx-md-5">
        {/* Logo và Hotline row trên mobile */}
        <div className="d-md-none w-100 mb-2">
          <div className="d-flex justify-content-between align-items-center">
            <div className="logo-mobile" style={{ maxWidth: '60%' }}>
              <Link to="/" className="d-flex align-items-center text-decoration-none">
                <img src={logoImg} alt="Logo" className="logo-img me-2" style={{ width: '35px', height: '35px' }} />
                <div className="d-flex align-items-center">
                  <span className="fw-bold text-success mb-0 me-1" style={{ fontSize: '18px' }}>MiMo</span>
                  <span className="fw-bold text-success mb-0" style={{ fontSize: '18px' }}>Agriculture</span>
                </div>
              </Link>
            </div>
            <div className="hotline-mobile text-end" style={{ maxWidth: '40%' }}>
              <i className="fas fa-phone icon-color me-1"></i>
              <span className="hotline-number fw-bold text-danger" style={{ fontSize: '14px' }}>085 399 1995</span>
            </div>
          </div>
        </div>
        
        {/* Logo trên desktop */}
        <Col xs={7} md={3} lg={3} className="mb-2 mb-md-0 d-none d-md-block">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img src={logoImg} alt="Logo" className="logo-img me-2" style={{ width: '40px', height: '40px' }} />
            <div className="d-flex align-items-center">
              <span className="fw-bold text-success mb-0 me-1" style={{ fontSize: '21px' }}>MiMo</span>
              <span className="fw-bold text-success mb-0" style={{ fontSize: '21px' }}>Agriculture</span>
            </div>
          </Link>
        </Col>

        {/* Hotline - chỉ hiển thị trên desktop */}
        <Col md={2} lg={2} className="text-end order-md-4 mb-md-0 d-none d-md-block">
          <div className="hotline-wrap text-end">
            <div className="d-flex align-items-center justify-content-end">
              <i className="fas fa-phone icon-color me-1"></i>
              <span className="hotline-label text-muted small">Hotline</span>
            </div>
            <span className="hotline-number fw-bold text-danger" style={{ fontSize: '18px' }}>085 399 1995</span>
          </div>
        </Col>

        {/* Free Shipping - Hiển thị trên mobile giữa logo và search bar */}
        <Col xs={12} md={2} lg={2} className="text-center order-3 order-md-3 d-flex align-items-center justify-content-center mb-2 mb-md-0">
          <div className="shipping-wrap d-flex align-items-center">
            <img src={shiper} alt="Shipping" className="shipping-icon me-2" style={{ width: '24px', height: '24px' }} />
            <span className="shipping-text small">Miễn phí vận chuyển cho đơn hàng từ 200k</span>
          </div>
        </Col>

        {/* Search Bar */}
        <Col xs={12} md={5} lg={5} className="order-4 order-md-2 my-2 my-md-0">
          <SearchBox />
          
          {/* Menu button cho mobile - Hiển thị nút menu */}
          {isMobile && (
            <div className="mt-3">
              <button 
                className="btn btn-success w-100 text-start" 
                onClick={toggleMobileMenu}
              >
                <i className="fas fa-bars me-2"></i>
                DANH MỤC SẢN PHẨM
              </button>
              
              {/* Menu dropdown - Hiển thị khi mobileMenuOpen = true */}
              {mobileMenuOpen && (
                <div className="mobile-menu mt-2">
                  <ul className="mobile-nav-links">
                    <li><Link to="/" onClick={toggleMobileMenu}>Trang chủ</Link></li>
                    <li><Link to="/san-pham" onClick={toggleMobileMenu}>Sản phẩm</Link></li>
                    <li><Link to="/tai-lieu-ky-thuat" onClick={toggleMobileMenu}>Tài liệu kỹ thuật</Link></li>
                    <li><Link to="/lien-he-mua-hang" onClick={toggleMobileMenu}>Liên Hệ Mua Hàng</Link></li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default LogoSection;
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import logoImg from '../../assets/icon/logo.png';
import shiperImg from '../../assets/icon/shiper.png';

function LogoSection() {
  return (
    <Container className="py-2">
      <div className="row align-items-center">
        <div className="col-6 col-md-3 col-lg-2 mb-2 mb-md-0">
          <div className="logo-wrap">
            <Link to="/" className="d-flex align-items-center text-decoration-none">
              <img src={logoImg} alt="Logo" className="logo-img me-2" />
              <span className="fw-bold text-success fs-5 mb-0">Mimo Agri</span>
            </Link>
          </div>
        </div>
        <div className="col-12 col-md-4 col-lg-4 order-3 order-md-2 mb-2 mb-md-0">
          <Form className="input-group search-bar">
            <Form.Control type="text" className="search-input" placeholder="Nhập thông tin tìm kiếm..." />
            <Button className="btn-search" type="submit" title="Tìm kiếm">
              <i className="fas fa-search"></i>
            </Button>
          </Form>
        </div>
        <div className="col-12 col-md-3 col-lg-3 text-center order-4 order-md-3 mb-2 mb-md-0">
          <div className="free-shipping-wrap d-flex align-items-center justify-content-md-end pe-md-3">
            <img src={shiperImg} alt="Miễn phí vận chuyển" className="me-2" style={{ height: '50px' }} />
            <div className="free-shipping-text">
              <div className="fw-bold text-success">Miễn phí vận chuyển</div>
              <div className="small">cho đơn hàng từ 200k</div>
            </div>
          </div>
        </div>
        <div className="col-6 col-md-2 col-lg-3 text-end order-2 order-md-4 mb-2 mb-md-0">
          <div className="hotline-wrap">
            <div>
              <i className="fas fa-phone-alt icon-color me-1"></i>
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
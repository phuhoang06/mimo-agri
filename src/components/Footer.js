import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container className="p-4">
        <Row className="gy-4">
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3 text-white">Thông tin Liên Hệ</h5>
            <p className="mb-1 text-white"><strong>MiMo AGRICULTURE</strong></p>
            <p className="mb-1 text-white">Địa chỉ: <span className="d-none d-md-inline">Số 11, 275 Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</span><span className="d-inline d-md-none">Hà Đông, Hà Nội</span></p>
            <p className="mb-1 text-white">Hotline: <a href="tel:+8485 399 1995" className="text-white text-decoration-none">085 399 1995</a></p>
            <p className="mb-1 text-white">Email: <a href="mailto:abc@gmail.com" className="text-white text-decoration-none">abc@gmail.com</a></p>
            <p className="mb-1 text-white">Website: <a href="https://abc.com" className="text-white text-decoration-none">abc.com</a></p>
            <div className="d-flex mt-3 justify-content-center justify-content-lg-start">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="me-3"><i className="fab fa-facebook-square fa-2x text-white"></i></a>
              <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener" className="me-3"><i className="fab fa-tiktok fa-2x text-white"></i></a>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener" className="me-3"><i className="fab fa-youtube fa-2x text-white"></i></a>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3 text-white">Chính Sách Bán Hàng</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Về chúng tôi</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Hướng dẫn mua hàng</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Chính sách thanh toán</a></li>
              <li className="mb-2"><a href="#!" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Chính sách bảo hành & đổi trả</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3 text-white">Đường đến MiMo AGRICULTURE</h5>
            <div className="mt-2 map-responsive">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d245.8737426403957!2d105.79678325846075!3d20.97673811420585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1742700098847!5m2!1svi!2s" width="100%" height="200" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <p className="text-white mb-0">© 2025 Copyright: <a className="text-white" href="#">Phú Hoàng</a></p>
      </div>
    </footer>
  );
}

export default Footer;
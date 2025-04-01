import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="footer">
      <Container className="p-4">
        <Row className="gy-4">
          <Col lg={6} md={12} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3 text-white">Thông tin Liên Hệ</h5>
            <p className="mb-1 text-white"><strong>MiMo Agriculture</strong></p>
            <p className="mb-1 text-white">Địa chỉ: <span className="d-none d-md-inline">Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</span><span className="d-inline d-md-none">Hà Đông, Hà Nội</span></p>
            <p className="mb-1 text-white">Hotline: <a href="tel:+8485 399 1995" className="text-white text-decoration-none">085 399 1995</a></p>
            <p className="mb-1 text-white">Email: <a href="mailto:mimoagriculture@gmail.com" className="text-white text-decoration-none">mimoagriculture@gmail.com</a></p>
            <p className="mb-1 text-white">Website: <a href="https://mimoagri.com" className="text-white text-decoration-none">mimoagri.com</a></p>
            <div className="d-flex mt-3 justify-content-center justify-content-lg-start">
              <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" className="me-3"><i className="fab fa-facebook-square fa-2x text-white"></i></a>
              <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener" className="me-3"><i className="fab fa-tiktok fa-2x text-white"></i></a>
              <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener" className="me-3"><i className="fab fa-youtube fa-2x text-white"></i></a>
            </div>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb-3 text-white">Chính Sách Bán Hàng</h5>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a href="/ve-chung-toi" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Về chúng tôi</a></li>
              <li className="mb-2"><a href="/chinh-sach-ban-hang#exchange" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Chính sách đổi trả</a></li>
              <li className="mb-2"><a href="/chinh-sach-ban-hang#shipping" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Chính sách vận chuyển</a></li>
              <li className="mb-2"><a href="/chinh-sach-ban-hang#support" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Chính sách hỗ trợ</a></li>
              <li className="mb-2"><a href="/lien-he" className="text-white text-decoration-none"><i className="fas fa-angle-right me-2"></i>Liên hệ</a></li>
            </ul>
          </Col>
          <Col lg={3} md={6} className="mb-4 mb-md-0">
            <h5 className="text-uppercase mb- text-white" style={{ whiteSpace: 'nowrap' }}>Fanpage Mimo Agriculture</h5>
            <div className="mt-2 map-responsive">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fwww.mimo.agri&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              width="340"
              height="350"
              style={{ border: 'none', overflow: 'hidden' }}
              allowFullScreen={true}
              title="Facebook Page"
            ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        <p className="text-white mb-0">Trang web này được thiết kế bởi  <a target="_blank"  style={{textDecoration: 'none',color:'red'}}  href="https://www.facebook.com/cutw.165">Phú Hoàng</a></p>
      </div>
    </footer>
  );
}

export default Footer; 
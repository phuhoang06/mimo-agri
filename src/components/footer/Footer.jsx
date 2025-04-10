import React from 'react';
import { Container, Row, Col, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useResponsive } from '../../utils/responsive';

function Footer() {
  const { isMobile } = useResponsive();

  // Style chung cho đồng bộ giao diện
  const titleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.25rem',
    fontWeight: 'bold', 
    marginBottom: isMobile ? '0.75rem' : '1rem'
  };
  
  const linkStyle = {
    color: '#bbb',
    textDecoration: 'none',
    fontSize: isMobile ? '0.9rem' : '1rem'
  };

  // Footer links
  const links = {
    about: [
      { title: 'Giới thiệu', path: '/gioi-thieu' },
      { title: 'Liên hệ', path: '/lien-he' },
      { title: 'Cửa hàng', path: '/cua-hang' },
      { title: 'Tin tức', path: '/tin-tuc' }
    ],
    policy: [
      { title: 'Chính sách đổi trả', path: '/chinh-sach-doi-tra' },
      { title: 'Chính sách vận chuyển', path: '/chinh-sach-van-chuyen' },
      { title: 'Chính sách bảo mật', path: '/chinh-sach-bao-mat' },
      { title: 'Điều khoản dịch vụ', path: '/dieu-khoan-dich-vu' }
    ],
    support: [
      { title: 'Hướng dẫn mua hàng', path: '/huong-dan-mua-hang' },
      { title: 'Hỏi đáp', path: '/hoi-dap' },
      { title: 'Đăng ký đại lý', path: '/dang-ky-dai-ly' },
      { title: 'Khuyến mãi', path: '/khuyen-mai' }
    ]
  };

  // Phiên bản mobile sử dụng Accordion
  if (isMobile) {
    return (
      <footer className="bg-dark text-white pt-4 pb-3">
        <Container fluid className="px-3">
          <div className="mb-4 text-center">
            <img src="/logo-mimo.png" alt="MIMO Agriculture" style={{ height: '40px' }} />
            <p className="mt-2 mb-0" style={{ fontSize: '0.9rem' }}>MIMO Agriculture - Nông nghiệp thông minh</p>
          </div>

          <Accordion className="mb-4">
            <Accordion.Item eventKey="0" className="bg-dark text-white border-secondary">
              <Accordion.Header className="bg-dark text-white">
                <span style={titleStyle}>VỀ CHÚNG TÔI</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {links.about.map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link to={link.path} style={linkStyle}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="1" className="bg-dark text-white border-secondary">
              <Accordion.Header className="bg-dark text-white">
                <span style={titleStyle}>CHÍNH SÁCH</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {links.policy.map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link to={link.path} style={linkStyle}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="2" className="bg-dark text-white border-secondary">
              <Accordion.Header className="bg-dark text-white">
                <span style={titleStyle}>HỖ TRỢ</span>
              </Accordion.Header>
              <Accordion.Body>
                <ul className="list-unstyled">
                  {links.support.map((link, index) => (
                    <li key={index} className="mb-2">
                      <Link to={link.path} style={linkStyle}>{link.title}</Link>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <div className="text-center mb-3">
            <h5 style={titleStyle}>THÔNG TIN LIÊN HỆ</h5>
            <p className="mb-1" style={{ fontSize: '0.9rem' }}><i className="fa fa-map-marker-alt me-2"></i>Địa chỉ: Tòa nhà CT2 Constrexim, Số 317 Nguyễn Quốc Trị, Trung Hoà, Cầu Giấy, Hà Nội</p>
            <p className="mb-1" style={{ fontSize: '0.9rem' }}><i className="fa fa-phone me-2"></i>Hotline: 0853.991.995</p>
            <p className="mb-1" style={{ fontSize: '0.9rem' }}><i className="fa fa-envelope me-2"></i>Email: info@mimo.vn</p>
          </div>

          <div className="text-center">
            <p className="mb-0 text-white-50" style={{ fontSize: '0.85rem' }}>© 2023 MIMO Agriculture. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    );
  }

  // Phiên bản desktop
  return (
    <footer className="bg-dark text-white pt-5 pb-4">
      <Container>
        <Row className="mb-4">
          <Col md={3} className="mb-4 mb-md-0">
            <div className="mb-4">
              <img src="/logo-mimo.png" alt="MIMO Agriculture" style={{ height: '50px' }} />
            </div>
            <p>MIMO Agriculture cung cấp các giải pháp nông nghiệp thông minh giúp nâng cao năng suất và chất lượng.</p>
            <div className="social-icons mt-3">
              <a href="https://facebook.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="https://youtube.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
              <a href="https://instagram.com" className="text-white me-3" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://tiktok.com" className="text-white" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok"></i></a>
            </div>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 style={titleStyle}>VỀ CHÚNG TÔI</h5>
            <ul className="list-unstyled footer-links">
              {links.about.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.path} style={linkStyle}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5 style={titleStyle}>CHÍNH SÁCH</h5>
            <ul className="list-unstyled footer-links">
              {links.policy.map((link, index) => (
                <li key={index} className="mb-2">
                  <Link to={link.path} style={linkStyle}>{link.title}</Link>
                </li>
              ))}
            </ul>
          </Col>
          
          <Col md={3}>
            <h5 style={titleStyle}>THÔNG TIN LIÊN HỆ</h5>
            <ul className="list-unstyled footer-contact">
              <li className="mb-2"><i className="fa fa-map-marker-alt me-2"></i>Địa chỉ: Tòa nhà CT2 Constrexim, Số 317 Nguyễn Quốc Trị, Trung Hoà, Cầu Giấy, Hà Nội</li>
              <li className="mb-2"><i className="fa fa-phone me-2"></i>Hotline: 0853.991.995</li>
              <li className="mb-2"><i className="fa fa-envelope me-2"></i>Email: info@mimo.vn</li>
            </ul>
          </Col>
        </Row>
        
        <hr className="border-secondary" />
        
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
          <p className="mb-3 mb-md-0 text-white-50">© 2023 MIMO Agriculture. All rights reserved.</p>
          <div>
            <img src="/payment-methods.png" alt="Payment Methods" style={{ height: '30px' }} />
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer; 
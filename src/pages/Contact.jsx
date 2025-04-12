import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { usePageTitle } from '../hooks';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';

function Contact() {
  // Sử dụng hook usePageTitle để thiết lập tiêu đề trang
  usePageTitle('Liên hệ mua hàng');
  
  return (
    <>
      <Header />
      
      <Container className="py-4">
        <Section id="contact" title="LIÊN HỆ">
          <Row>
            <Col lg={6} className="mb-4">
              <h4 className="mb-4">Thông tin liên hệ</h4>
              
              <div className="contact-info">
                <div className="mb-4">
                  <h5><i className="fas fa-map-marker-alt me-2 text-success"></i>Địa chỉ:</h5>
                  <p className="ms-4">Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fas fa-phone me-2 text-success"></i>Hotline:</h5>
                  <p className="ms-4">0853.991.995</p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fab fa-whatsapp me-2 text-success"></i>Zalo:</h5>
                  <p className="ms-4">0853.991.995</p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fab fa-facebook me-2 text-success"></i>Fanpage:</h5>
                  <p className="ms-4"><a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener">MiMo Agriculture</a></p>
                </div>
                
                <div className="mb-4">
                  <h5><i className="fab fa-youtube me-2 text-success"></i>Youtube:</h5>
                  <p className="ms-4"><a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener">MiMo Agriculture</a></p>
                </div>
              </div>
              
              <div className="map-container mt-5">
                <h4 className="mb-3">Bản đồ</h4>
                <div className="ratio ratio-16x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d245.8737426403957!2d105.79678325846075!3d20.97673811420585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1svi!2s!4v1742700098847!5m2!1svi!2s" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy"
                    title="Bản đồ MiMo Agriculture"
                  ></iframe>
                </div>
              </div>
            </Col>
            
            <Col lg={6}>
              <h4 className="mb-4">Gửi thông tin liên hệ</h4>
            
              
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Họ và tên</Form.Label>
                  <Form.Control type="text" placeholder="Nhập họ và tên" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Số điện thoại</Form.Label>
                  <Form.Control type="tel" placeholder="Nhập số điện thoại" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Nhập địa chỉ email" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control type="text" placeholder="Nhập tiêu đề" />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Nội dung</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Nhập nội dung" />
                </Form.Group>
               
              <div className="alert alert-warning" role="alert">
                <h8>hiện tính năng đang phát triển chưa thể dùng được</h8>
              </div>
                
                <Button variant="success" className="w-100">
                  Gửi thông tin
                </Button>
                
              </Form>
            </Col>
          </Row>
        </Section>
      </Container>
      
      <Footer />
    </>
  );
}

export default Contact; 
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';

function AboutUs() {
  return (
    <>
      <Header />
      
      <Container className="py-4">
        <Section id="about-us" title="VỀ CHÚNG TÔI">
          <Row>
            <Col xs={12}>
              <div className="about-content">
                <h3 className="mb-4 fw-bold">MiMo Agriculture - Giải pháp nông nghiệp thông minh</h3>
                
                <p className="mb-2">MiMo Agriculture là đơn vị chuyên cung cấp giải pháp kiểm soát ruồi vàng và côn trùng An toàn - Hiệu quả - Tiết kiệm.</p>

                <p className="mb-2">Ngoài ra MiMo có rất đa dạng các sản phẩm vật tư nông nghiệp thông minh cùng các loại hạt giống chất lượng cao.</p>
                
                <h4 className="mt-5 mb-3 fw-bold">Tầm nhìn</h4>
                <p className='mb-2'>Trở thành đơn vị hàng đầu trong lĩnh vực cung cấp giải pháp nông nghiệp thông minh, góp phần phát triển ngành nông nghiệp Việt Nam theo hướng hiện đại, bền vững và hiệu quả.</p>
                
                <h4 className="mt-4 mb-3 fw-bold">Sứ mệnh</h4>
                <p className='mb-2'>Mang đến cho khách hàng những sản phẩm và giải pháp nông nghiệp tiên tiến, giúp tối ưu hóa quá trình sản xuất, tiết kiệm chi phí và tăng năng suất.</p>
                
                <h4 className="mt-4 mb-3 fw-bold">Giá trị cốt lõi</h4>
                <ul className="list-unstyled">
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Chất lượng: Cam kết cung cấp sản phẩm chất lượng cao</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Đổi mới: Liên tục cập nhật công nghệ và giải pháp mới</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Hiệu quả: Tối ưu hóa hiệu quả đầu tư cho khách hàng</li>
                  <li className="mb-2"><i className="fas fa-check text-success me-2"></i>Tận tâm: Hỗ trợ và đồng hành cùng khách hàng</li>
                </ul>
              </div>
            </Col>
          </Row>
        </Section>
      </Container>
      
      <Footer />
    </>
  );
}

export default AboutUs; 
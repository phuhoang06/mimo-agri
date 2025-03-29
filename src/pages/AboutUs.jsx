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
                <h3 className="mb-4">MiMo Agriculture - Giải pháp nông nghiệp thông minh</h3>
                
                <p className="mb-3">MiMo Agriculture là đơn vị chuyên cung cấp các giải pháp nông nghiệp thông minh.</p>
                
                <p className="mb-3">Chúng tôi luôn cố gắng mang đến những sản phẩm chất lượng hàng đầu, giúp quý khách tiết kiệm chi phí và gia tăng năng suất trồng trọt.</p>
                
                <h4 className="mt-5 mb-3">Tầm nhìn</h4>
                <p>Trở thành đơn vị hàng đầu trong lĩnh vực cung cấp giải pháp nông nghiệp thông minh, góp phần phát triển ngành nông nghiệp Việt Nam theo hướng hiện đại, bền vững và hiệu quả.</p>
                
                <h4 className="mt-4 mb-3">Sứ mệnh</h4>
                <p>Mang đến cho khách hàng những sản phẩm và giải pháp nông nghiệp tiên tiến, giúp tối ưu hóa quá trình sản xuất, tiết kiệm chi phí và tăng năng suất.</p>
                
                <h4 className="mt-4 mb-3">Giá trị cốt lõi</h4>
                <ul>
                  <li>Chất lượng: Cam kết cung cấp sản phẩm chất lượng cao</li>
                  <li>Đổi mới: Liên tục cập nhật công nghệ và giải pháp mới</li>
                  <li>Hiệu quả: Tối ưu hóa hiệu quả đầu tư cho khách hàng</li>
                  <li>Tận tâm: Hỗ trợ và đồng hành cùng khách hàng</li>
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
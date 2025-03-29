import React from 'react';
import { Container, Row, Col, Card, Nav, Tab } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function SalesPolicy() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("exchange");
  
  useEffect(() => {
    // Check if there's a hash in the URL and set the active tab accordingly
    if (location.hash) {
      const hash = location.hash.replace('#', '');
      setActiveTab(hash);
    }
  }, [location]);

  return (
    <>
      <Header />
      
      <Container className="py-4">
        <Section id="sales-policy" title="CHÍNH SÁCH BÁN HÀNG">
          <Row>
            <Col xs={12}>
              <Card>
                <Card.Body>
                  <Tab.Container id="policy-tabs" activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
                    <Nav variant="tabs" className="mb-4">
                      <Nav.Item>
                        <Nav.Link eventKey="exchange">Chính sách đổi trả</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="shipping">Chính sách vận chuyển</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="support">Chính sách hỗ trợ</Nav.Link>
                      </Nav.Item>
                    </Nav>
                    
                    <Tab.Content>
                      <Tab.Pane eventKey="exchange">
                        <h4 className="mb-3">Cam kết đổi 1 đền 1 nếu có lỗi từ NSX</h4>
                        <p className="mb-3">Tại MiMo Agriculture, chúng tôi cam kết đảm bảo chất lượng sản phẩm cung cấp đến khách hàng. Trong trường hợp sản phẩm có lỗi từ nhà sản xuất, chúng tôi sẽ thực hiện chính sách đổi 1 đền 1 cho khách hàng.</p>
                        
                        <h5 className="mt-4">Điều kiện áp dụng:</h5>
                        <ul>
                          <li>Sản phẩm còn trong thời hạn bảo hành</li>
                          <li>Sản phẩm bị lỗi kỹ thuật từ nhà sản xuất, không do tác động bên ngoài</li>
                          <li>Sản phẩm còn nguyên tem, nhãn và phụ kiện đi kèm</li>
                        </ul>
                        
                        <h5 className="mt-4">Quy trình đổi trả:</h5>
                        <ol>
                          <li>Thông báo cho MiMo Agriculture qua hotline 0853.991.995 hoặc Zalo</li>
                          <li>Gửi hình ảnh hoặc video mô tả lỗi sản phẩm</li>
                          <li>Nhân viên kỹ thuật sẽ xác nhận lỗi và hướng dẫn thủ tục đổi trả</li>
                          <li>Gửi sản phẩm lỗi về MiMo Agriculture theo hướng dẫn</li>
                          <li>Nhận sản phẩm mới thay thế</li>
                        </ol>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="shipping">
                        <h4 className="mb-3">Nhận phí vận chuyển cho đơn hàng từ 200k</h4>
                        <p className="mb-3">MiMo Agriculture cung cấp dịch vụ vận chuyển đến tận nơi cho khách hàng với chính sách cước phí hợp lý. Đặc biệt, chúng tôi miễn phí vận chuyển cho đơn hàng có giá trị từ 200.000đ.</p>
                        
                        <h5 className="mt-4">Phạm vi vận chuyển:</h5>
                        <p>Chúng tôi vận chuyển đến tất cả các tỉnh thành trên toàn quốc thông qua đối tác vận chuyển uy tín.</p>
                        
                        <h5 className="mt-4">Thời gian giao hàng:</h5>
                        <ul>
                          <li>Nội thành Hà Nội: 1-2 ngày làm việc</li>
                          <li>Các tỉnh miền Bắc: 2-3 ngày làm việc</li>
                          <li>Các tỉnh miền Trung và miền Nam: 3-5 ngày làm việc</li>
                        </ul>
                        
                        <h5 className="mt-4">Chính sách phí vận chuyển:</h5>
                        <ul>
                          <li>Miễn phí vận chuyển cho đơn hàng từ 200.000đ</li>
                          <li>Đơn hàng dưới 200.000đ: Phí vận chuyển từ 20.000đ - 40.000đ tùy khu vực</li>
                        </ul>
                      </Tab.Pane>
                      
                      <Tab.Pane eventKey="support">
                        <h4 className="mb-3">Hỗ trợ trả lời mọi thắc mắc</h4>
                        <p className="mb-3">MiMo Agriculture cam kết hỗ trợ và giải đáp mọi thắc mắc của khách hàng liên quan đến sản phẩm, đơn hàng và các dịch vụ của chúng tôi. Đội ngũ tư vấn viên chuyên nghiệp sẽ hỗ trợ quý khách một cách nhanh chóng và hiệu quả.</p>
                        
                        <h5 className="mt-4">Kênh hỗ trợ khách hàng:</h5>
                        <ul>
                          <li><strong>Hotline:</strong> 0853.991.995 (8:00 - 18:00, từ Thứ 2 - Chủ Nhật)</li>
                          <li><strong>Zalo:</strong> 0853.991.995</li>
                          <li><strong>Fanpage:</strong> <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener">MiMo Agriculture</a></li>
                          <li><strong>Email:</strong> mimoagriculture@gmail.com</li>
                        </ul>
                        
                        <h5 className="mt-4">Các vấn đề hỗ trợ:</h5>
                        <ul>
                          <li>Tư vấn sản phẩm và kỹ thuật sử dụng</li>
                          <li>Thông tin đơn hàng và vận chuyển</li>
                          <li>Hướng dẫn đổi/trả sản phẩm</li>
                          <li>Khiếu nại và góp ý</li>
                          <li>Tư vấn kỹ thuật trồng trọt và chăm sóc cây</li>
                        </ul>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Section>
      </Container>
      
      <Footer />
    </>
  );
}

export default SalesPolicy; 
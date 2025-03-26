import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import { 
  allProducts,
  topSellingProducts, 
  newProducts,
  getUniqueProducts 
} from '../utils/products';

// Import news images 
import news1 from '../assets/hot_new/new1.png';
import news2 from '../assets/hot_new/new2.png';

function Home() {
  const newsData = [
    { img: news1, title: 'Chai xịt ruồi vàng thế hệ mới', description: 'Mô tả ngắn về tin tức 1...' },
    { img: news2, title: 'Lưu ý khi mua hàng', description: 'Mô tả ngắn về tin tức 2...' },
  ];

  // Loại bỏ trùng lặp để hiển thị trang "Tất cả sản phẩm"
  const uniqueProducts = getUniqueProducts(allProducts);
  
  return (
    <>
      <Header />
      
      {/* SẢN PHẨM BÁN CHẠY */}
      <section id="top-selling" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <h2 className="category-title">SẢN PHẨM BÁN CHẠY</h2>
            <Row className="g-3">
              {topSellingProducts.slice(0, 5).map((product, index) => (
                <ProductCard key={index} product={product} className="col-6 col-sm-4 col-md-3 col-lg-2-4" />
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* TẤT CẢ SẢN PHẨM */}
      <section id="all-products" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="category-title mb-0">TẤT CẢ SẢN PHẨM</h2>
              <Button as={Link} to="/san-pham" variant="outline-success" size="sm">xem thêm</Button>
            </div>
            <Row className="g-3">
              {uniqueProducts.slice(0, 10).map((product, index) => (
                <ProductCard key={index} product={product} className="col-6 col-sm-4 col-md-3 col-lg-2-4" />
              ))}
            </Row>
          </div>
        </Container>
      </section>

      {/* VIDEO SECTION */}
      <section id="video-section" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="category-title mb-0">VIDEO</h2>
              <Button variant="outline-success" size="sm">xem thêm</Button>
            </div>
            <div className="mb-4">
              <div className="ratio ratio-16x9">
                <iframe 
                  src="https://www.youtube.com/embed/osD0RAxQsbE" 
                  title="YouTube video" 
                  allowFullScreen>
                </iframe>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* HƯỚNG DẪN VÀ CHĂM SÓC */}
      <section id="guides-care" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="category-title mb-0">HƯỚNG DẪN VÀ CHĂM SÓC</h2>
              <Button variant="outline-success" size="sm">xem thêm</Button>
            </div>
            
            <Row className="g-3">
              <Col md={3}>
                <div className="guide-card p-3 border rounded h-100">
                  <img src={require('../assets/product/product1.png')} alt="Hướng dẫn" className="w-100 mb-2" style={{height: '120px', objectFit: 'cover'}} />
                  <h5 className="guide-title">Tiêu đề bài viết</h5>
                </div>
              </Col>
              <Col md={3}>
                <div className="guide-card p-3 border rounded h-100">
                  <img src={require('../assets/product/product2.png')} alt="Hướng dẫn" className="w-100 mb-2" style={{height: '120px', objectFit: 'cover'}} />
                  <h5 className="guide-title">Tiêu đề bài viết</h5>
                </div>
              </Col>
              <Col md={3}>
                <div className="guide-card p-3 border rounded h-100">
                  <img src={require('../assets/product/product3.png')} alt="Hướng dẫn" className="w-100 mb-2" style={{height: '120px', objectFit: 'cover'}} />
                  <h5 className="guide-title">Tiêu đề bài viết</h5>
                </div>
              </Col>
              <Col md={3}>
                <div className="guide-card p-3 border rounded h-100">
                  <img src={require('../assets/product/product4.png')} alt="Hướng dẫn" className="w-100 mb-2" style={{height: '120px', objectFit: 'cover'}} />
                  <h5 className="guide-title">Tiêu đề bài viết</h5>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </section>

      {/* FOOTER INFO SECTION */}
      <section id="footer-info" className="mt-5 mb-5">
        <Container fluid className="px-3 px-md-4">
          <Row>
            <Col md={4} className="mb-4">
              <div className="info-card p-3 border rounded h-100">
                <h4 className="text-center mb-3">VỀ CHÚNG TÔI</h4>
                <p>MiMo Agriculture là đơn vị chuyên cung cấp các giải pháp nông nghiệp thông minh.</p>
                <p>Chúng tôi luôn cố gắng mang đến những sản phẩm chất lượng hàng đầu, giúp quý khách tiết kiệm chi phí và gia tăng năng suất trồng trọt.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="info-card p-3 border rounded h-100">
                <h4 className="text-center mb-3">CHÍNH SÁCH BÁN HÀNG</h4>
                <p>Cam kết đổi 1 đền 1 nếu có lỗi từ NSX.</p>
                <p>Nhận phí vận chuyển cho đơn hàng từ 200k.</p>
                <p>Hỗ trợ trả lời mọi thắc mắc liên hệ qua số hotline 0853.991.995 hoặc nhắn tin qua Zalo để được hỗ trợ.</p>
              </div>
            </Col>
            <Col md={4} className="mb-4">
              <div className="info-card p-3 border rounded h-100">
                <h4 className="text-center mb-3">LIÊN HỆ</h4>
                <p>Hotline: 0853.991.995</p>
                <p>Zalo: 0853.991.995</p>
                <p>Fanpage: <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener">link Fanpage</a></p>
                <p>Youtube: <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener">link Youtube</a></p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Home;
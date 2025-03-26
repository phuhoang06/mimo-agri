import React from 'react';
import { Container, Carousel, Row, Col } from 'react-bootstrap';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import NewsCard from '../components/NewsCard';
import VideoCarousel from '../components/VideoCarousel';
import { topSellingProducts, newProducts } from '../utils/products';

// Import banner images
import banner1 from '../assets/banner/banner1.png';
import banner2 from '../assets/banner/banner2.png';
import banner3 from '../assets/banner/banner3.png';
import banner4 from '../assets/banner/banner4.png';
import banner5 from '../assets/banner/banner5.png';

// Import news images 
import news1 from '../assets/hot_new/new1.png';
import news2 from '../assets/hot_new/new2.png';

function Home() {
  const newsData = [
    { img: news1, title: 'Chai xịt ruồi vàng thế hệ mới', description: 'Mô tả ngắn về tin tức 1...' },
    { img: news2, title: 'Lưu ý khi mua hàng', description: 'Mô tả ngắn về tin tức 2...' },
  ];

  return (
    <>
      <Header />
      <Container fluid className="mt-4 px-3 px-md-4">
        <Row className="g-3">
          <Col md={8}>
            <Carousel id="bannerCarousel" interval={3000}>
              <Carousel.Item>
                <img src={banner1} className="d-block w-100" alt="Banner 1" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner2} className="d-block w-100" alt="Banner 2" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner3} className="d-block w-100" alt="Banner 3" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner4} className="d-block w-100" alt="Banner 4" />
              </Carousel.Item>
              <Carousel.Item>
                <img src={banner5} className="d-block w-100" alt="Banner 5" />
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={4}>
            <div className="category-container">
              <h5 className="category-title mb-3">Video</h5>
              <VideoCarousel />
            </div>
          </Col>
        </Row>
      </Container>

      <section id="top-selling" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <h2 className="category-title">Top bán chạy</h2>
            <Row className="g-3">
              {topSellingProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </Row>
          </div>
        </Container>
      </section>

      <section id="rau-an-la" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <h2 className="category-title">Rau ăn lá</h2>
            <Row className="g-3">
              {newProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </Row>
          </div>
        </Container>
      </section>

      <section id="tintuc" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <h2 className="category-title">Tin tức mới</h2>
            <Carousel id="newsCarousel" interval={3000}>
              <Carousel.Item>
                <Row className="g-3">
                  <Col md={4}>
                    <div className="card product-card">
                      <img src={news1} className="card-img-top" alt="Tin tức 1" loading="lazy" />
                      <div className="card-body">
                        <h5 className="card-title">Tin tức 1</h5>
                        <p className="card-text">Mô tả ngắn về tin tức.</p>
                        <a href="#" className="btn btn-primary">Xem thêm</a>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="card product-card">
                      <img src={news2} className="card-img-top" alt="Tin tức 2" loading="lazy" />
                      <div className="card-body">
                        <h5 className="card-title">Tin tức 2</h5>
                        <p className="card-text">Mô tả ngắn về tin tức.</p>
                        <a href="#" className="btn btn-primary">Xem thêm</a>
                      </div>
                    </div>
                  </Col>
                  <Col md={4}>
                    <div className="card product-card">
                      <img src={news1} className="card-img-top" alt="Tin tức 3" loading="lazy" />
                      <div className="card-body">
                        <h5 className="card-title">Tin tức 3</h5>
                        <p className="card-text">Mô tả ngắn về tin tức.</p>
                        <a href="#" className="btn btn-primary">Xem thêm</a>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Carousel.Item>
            </Carousel>
            
            <div className="mt-4">
              <h5 className="featured-news-title mb-3">Tin nổi bật</h5>
              <Row className="g-3 featured-news-container">
                {newsData.map((news, index) => (
                  <Col md={6} key={index}>
                    <NewsCard news={news} />
                  </Col>
                ))}
              </Row>
            </div>
          </div>
        </Container>
      </section>

      <section id="gioi-thieu" className="mt-5">
        <Container fluid className="px-3 px-md-4">
          <div className="category-container">
            <h2 className="category-title">Giới thiệu</h2>
            <div className="p-4 bg-light rounded shadow">
              <p className="text-muted">
                Kính chào quý khách đến với <strong>Mimo - Agriculture</strong>! Chúng tôi tự hào là đơn vị cung cấp các sản phẩm nông nghiệp chất lượng cao, bao gồm hạt giống, phân bón hữu cơ và vật tư nông nghiệp, góp phần vào sự phát triển bền vững và thịnh vượng của nền nông nghiệp Việt Nam...
              </p>
              <h5 className="mt-4">Hạt giống</h5>
              <p>Chúng tôi cung cấp đa dạng các loại hạt giống chất lượng, được tuyển chọn kỹ lưỡng từ các nhà cung cấp uy tín trong và ngoài nước...</p>
              <h5 className="mt-4">Phân bón hữu cơ</h5>
              <p>Với xu hướng nông nghiệp xanh và bền vững, Mimo - Agriculture đặc biệt chú trọng đến các sản phẩm phân bón hữu cơ...</p>
              <h5 className="mt-4">Vật tư nông nghiệp</h5>
              <p>Bên cạnh hạt giống và phân bón, Mimo - Agriculture còn cung cấp đầy đủ các loại vật tư nông nghiệp cần thiết...</p>
              <h5 className="mt-4">Cam kết của chúng tôi</h5>
              <ul>
                <li>Chất lượng vượt trội: Cung cấp các sản phẩm có nguồn gốc rõ ràng, được kiểm định chất lượng nghiêm ngặt.</li>
                <li>Giá cả cạnh tranh: Mang đến những sản phẩm chất lượng với mức giá hợp lý nhất trên thị trường.</li>
                <li>Tư vấn tận tâm: Đội ngũ nhân viên giàu kinh nghiệm luôn sẵn sàng hỗ trợ khách hàng.</li>
                <li>Hướng đến tương lai xanh: Góp phần vào sự phát triển của nền nông nghiệp bền vững.</li>
              </ul>
              <h5 className="mt-4">Tầm nhìn và sứ mệnh</h5>
              <p><strong>Tầm nhìn:</strong> Trở thành một trong những đơn vị hàng đầu tại Việt Nam trong lĩnh vực cung cấp sản phẩm và giải pháp nông nghiệp chất lượng cao.<br />
                <strong>Sứ mệnh:</strong> Mang đến những sản phẩm và dịch vụ tốt nhất, hỗ trợ nhà nông sản xuất hiệu quả, bền vững và tạo ra những nông sản an toàn, chất lượng cho cộng đồng.</p>
              <p className="text-center mt-4"><strong>Hãy liên hệ với Mimo - Agriculture ngay hôm nay để được tư vấn và trải nghiệm những sản phẩm nông nghiệp chất lượng hàng đầu!</strong></p>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Home;
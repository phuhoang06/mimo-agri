import React, { useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../utils/CartManager';
import CartModal from './CartModal';
import logoImg from '../assets/icon/logo.png';

function Header() {
  const { cart, showCart } = useCart();

  useEffect(() => {
    // Khởi tạo carousel khi component được render
    const carouselElement = document.getElementById('bannerCarousel');
    if (carouselElement) {
      // Tạo một object mới để lưu cài đặt
      const options = {
        interval: 3000,
        ride: true,
        pause: false
      };
      
      // Cập nhật thuộc tính data-bs-* cho carousel
      Object.keys(options).forEach(key => {
        carouselElement.setAttribute(`data-bs-${key}`, options[key]);
      });
      
      // Kích hoạt carousel bằng cách gửi sự kiện
      const event = new Event('slid.bs.carousel');
      carouselElement.dispatchEvent(event);
    }
  }, []);

  return (
    <div className="header-bar">
      <div className="top-bar">
        <Container className="d-flex justify-content-between align-items-center flex-wrap py-2">
          <div className="d-flex align-items-center flex-wrap">
            <span className="me-3 mb-1">
              <i className="fas fa-map-marker-alt icon-color me-1"></i>
              <span className="d-none d-md-inline">Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</span>
              <span className="d-inline d-md-none">Hà Đông, Hà Nội</span>
            </span>
            <span className="me-3 mb-1">
              <i className="fas fa-phone-alt icon-color me-1"></i> 085 399 1995
            </span>
            <span className="me-3 mb-1">
              <i className="fas fa-envelope icon-color me-1"></i> mimoagriculture@gmail.com 
            </span>
            <span className="mb-1">
              <i className="fas fa-globe icon-color me-1"></i> abc.com
            </span>
          </div>
          <div className="social-icons mt-1">
            <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener"><i className="fab fa-facebook mx-1"></i></a>
            <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener"><i className="fab fa-tiktok mx-1"></i></a>
            <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener"><i className="fab fa-youtube mx-1"></i></a>
          </div>
        </Container>
      </div>
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
          <div className="col-12 col-md-6 col-lg-7 order-3 order-md-2 mb-2 mb-md-0">
            <Form className="input-group search-bar mx-md-3">
              <Form.Control type="text" className="search-input" placeholder="Nhập thông tin tìm kiếm..." />
              <Button className="btn-search" type="submit" title="Tìm kiếm">
                <i className="fas fa-search"></i>
              </Button>
            </Form>
          </div>
          <div className="col-6 col-md-3 col-lg-3 text-end order-2 order-md-3 mb-2 mb-md-0">
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
      
      {/* Thanh menu chính theo thiết kế mới */}
      <div className="main-menu bg-success">
        <Container className="d-flex align-items-center">
          <Nav className="horizontal-nav mx-4">
            <Nav.Link as={Link} to="/" className="text-white">TRANG CHỦ</Nav.Link>
            <Nav.Link as={Link} to="/san-pham" className="text-white">SẢN PHẨM</Nav.Link>
            <Nav.Link as={Link} to="/tai-lieu-ky-thuat" className="text-white">TÀI LIỆU KỸ THUẬT</Nav.Link>
            <Nav.Link as={Link} to="/lien-he-mua-hang" className="text-white">LIÊN HỆ MUA HÀNG</Nav.Link>
          </Nav>
          
          <div className="ms-auto">
            <Button id="cartButton" variant="outline-light" className="position-relative" onClick={showCart}>
              <i className="fas fa-shopping-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.length}</span>
            </Button>
          </div>
        </Container>
      </div>
      
      <div className="content-area">
        <Container fluid className="p-0">
          <div className="row g-0">
            <div className="col-lg-3 category-sidebar">
              <div className="sidebar-menu bg-white">
                <div className="category-header bg-success text-white p-3">
                  <i className="fas fa-bars me-2"></i>
                  <span>DANH MỤC SẢN PHẨM</span>
                </div>
                <ul className="category-menu-list">
                  <li className="menu-item">
                    <Link to="/san-pham#bay-ruoi-vang" className="menu-link">Bầy Ruồi Vàng - Côn Trùng</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/san-pham#hat-giong-mua-he" className="menu-link">Hạt Giống Mùa Hè</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/san-pham#hat-giong-mua-thu" className="menu-link">Hạt Giống Mùa Thu</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/san-pham#hat-giong-mua-dong" className="menu-link">Hạt Giống Mùa Đông</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/san-pham#dung-cu-cuoc-xeng-keo" className="menu-link">Dụng Cụ Cuốc - Xẻng - Kéo</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/san-pham#voi-tuoi-cay" className="menu-link">Vòi Tưới Cây</Link>
                  </li>
                  <li className="menu-item">
                    <Link to="/san-pham#dat-phan-bon-thuoc" className="menu-link">Đất - Phân Bón - Thuốc</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9 main-content">
              <div className="carousel-container mt-3">
                <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
                  <div className="carousel-indicators">
                    <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="0" aria-label="Slide 1" aria-current="false"></button>
                    <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="1" aria-label="Slide 2" aria-current="false"></button>
                    <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="2" aria-label="Slide 3" aria-current="true" className="active"></button>
                    <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="3" aria-label="Slide 4" aria-current="false"></button>
                    <button type="button" data-bs-target="#bannerCarousel" data-bs-slide-to="4" aria-label="Slide 5" aria-current="false"></button>
                  </div>
                  <div className="carousel-inner">
                    <div className="carousel-item">
                      <img className="d-block w-100" alt="Banner 1" src="/static/media/banner1.2994d618770a556921ea.png" />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" alt="Banner 2" src="/static/media/banner2.3c1e7939f3b6dd892ba3.png" />
                    </div>
                    <div className="active carousel-item">
                      <img className="d-block w-100" alt="Banner 3" src="/static/media/banner3.cf59588abf3de3fdf211.png" />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" alt="Banner 4" src="/static/media/banner4.9ede27c59a2ef83d113e.png" />
                    </div>
                    <div className="carousel-item">
                      <img className="d-block w-100" alt="Banner 5" src="/static/media/banner5.9e8e39ea457ae571caaf.png" />
                    </div>
                  </div>
                  <a className="carousel-control-prev" role="button" data-bs-target="#bannerCarousel" data-bs-slide="prev" href="#">
                    <span aria-hidden="true" className="carousel-control-prev-icon"></span>
                    <span className="visually-hidden">Previous</span>
                  </a>
                  <a className="carousel-control-next" role="button" data-bs-target="#bannerCarousel" data-bs-slide="next" href="#">
                    <span aria-hidden="true" className="carousel-control-next-icon"></span>
                    <span className="visually-hidden">Next</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      <CartModal />
      
      {/* Thêm script để đảm bảo carousel hoạt động */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              var carousel = document.getElementById('bannerCarousel');
              if (carousel) {
                new bootstrap.Carousel(carousel, {
                  interval: 3000,
                  ride: 'carousel'
                });
              }
            });
          `
        }}
      />
    </div>
  );
}

export default Header;
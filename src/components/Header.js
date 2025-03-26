import React from 'react';
import { Navbar, Nav, NavDropdown, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../utils/CartManager';
import CartModal from './CartModal';
import logoImg from '../assets/icon/logo.png';

function Header() {
  const { cart, showCart } = useCart();

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
            <a href="#" target="_blank" rel="noopener"><i className="fab fa-pinterest mx-1"></i></a>
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
      <div className="menu-bar">
        <Container>
          <Navbar expand="lg" className="navbar-dark p-0">
            <Navbar.Toggle aria-controls="navbarMenu" />
            <Navbar.Collapse id="navbarMenu">
              <Nav className="text-uppercase fw-bold mx-auto">
                <Nav.Link as={Link} to="/" className="nav-link">Trang chủ</Nav.Link>
                <Nav.Link href="#gioi-thieu" className="nav-link">Giới thiệu</Nav.Link>
                <NavDropdown title="Sản phẩm" id="productDropdown">
                  <NavDropdown.Item href="#top-selling">Top bán chạy</NavDropdown.Item>
                  <NavDropdown.Item href="#rau-an-la">Rau ăn lá</NavDropdown.Item>
                </NavDropdown>
                <Nav.Link href="#" className="nav-link">Hình ảnh bàn giao</Nav.Link>
                <Nav.Link href="#tintuc" className="nav-link">Tin tức</Nav.Link>
                <Nav.Link href="#video" className="nav-link">Video</Nav.Link>
                <Nav.Link href="#" className="nav-link">Tuyển dụng</Nav.Link>
                <Nav.Link href="#" className="nav-link">Liên hệ</Nav.Link>
              </Nav>
            </Navbar.Collapse>
            <div className="ms-auto d-flex">
              <Button id="cartButton" variant="outline-light" className="position-relative ms-2" onClick={showCart}>
                <i className="fas fa-shopping-cart"></i>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.length}</span>
              </Button>
            </div>
          </Navbar>
        </Container>
      </div>
      <CartModal />
    </div>
  );
}

export default Header;
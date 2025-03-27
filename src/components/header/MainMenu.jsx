import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Banner from './Banner';
import { useCart } from '../../utils/CartManager';
import { categories } from '../../data/categories';

function MainMenu() {
  const { showCart, cart } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile based on screen width
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      // Only run scroll effects if not on mobile
      if (!isMobile) {
        const scrollPosition = window.scrollY;
        const headerHeight = 150; // Approximate height of header (top bar + logo section)
        const scrolled = scrollPosition > headerHeight;
        setIsScrolled(scrolled);
        
        // Add/remove body class
        if (scrolled) {
          document.body.classList.add('menu-fixed');
        } else {
          document.body.classList.remove('menu-fixed');
        }
      }
    };

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('menu-fixed');
    };
  }, [isMobile]);
  
  // Custom navigation function with scrolling
  const handleNavigation = (path) => {
    navigate(path);
    // Scroll to main content after navigation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, 100);
  };
  
  // If on mobile, don't render the menu
  if (isMobile) {
    return null;
  }
  
  return (
    <>
      {/* Green menu bar with DANH MỤC SẢN PHẨM and navigation */}
      <div className={`main-menu-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col xs={12} className="main-menu-bar">
              <div className="menu-category-title">
              <i className="fas fa-bars me-2"></i>
               DANH MỤC SẢN PHẨM
              </div>
              <div className="main-navigation">
                <ul className="nav-links">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>Trang chủ</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/san-pham'); }}>Sản phẩm</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/tai-lieu-ky-thuat'); }}>Tài liệu kỹ thuật</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/lien-he-mua-hang'); }}>Liên Hệ Mua Hàng</a></li>
                </ul>
              </div>
              <div className="cart-button">
                <Button variant="success" onClick={showCart} className="cart-btn">
                  <i className="fa fa-shopping-cart"></i>
                  {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main content with categories and banner */}
      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Left sidebar with categories */}
          <Col md={3} className="sidebar-categories">
            <ul className="category-links">
              {categories.map((category) => (
                <li key={category.id}>
                  <a 
                    href="#" 
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleNavigation(`/san-pham#${category.id}`); 
                    }}
                  >
                    {category.name}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          
          {/* Right side banner */}
          <Col md={9}>
            <Banner />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default MainMenu;
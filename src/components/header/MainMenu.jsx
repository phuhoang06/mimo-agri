import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Banner from './Banner';
import { useCart } from '../../utils/CartManager';
import { categories } from '../../data/categories';

function MainMenu() {
  const { showCart, cart, isCartEnabled } = useCart();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  
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
    // Kiểm tra xem đường dẫn hiện tại có phải là /san-pham không
    const currentPath = window.location.pathname;
    const isProductPage = currentPath === '/san-pham';
    const isNavigatingToProductPage = path.startsWith('/san-pham');
    
    // Nếu đang ở trang sản phẩm và đang điều hướng đến 1 danh mục
    if (isProductPage && isNavigatingToProductPage && path.includes('#')) {
      const hash = path.split('#')[1];
      
      // Nếu hash hiện tại khác với hash mới, thay đổi hash và kích hoạt sự kiện hashchange
      if (window.location.hash.replace('#', '') !== hash) {
        window.location.hash = hash;
        
        // Thông báo hash đã thay đổi để các component khác cập nhật
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        
        // Cuộn đến vùng hiển thị sản phẩm sau khi hash thay đổi
        setTimeout(() => {
          const productListElement = document.querySelector('#product-list');
          if (productListElement) {
            productListElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // Nếu hash không thay đổi nhưng vẫn cần cuộn đến vị trí sản phẩm
        const productListElement = document.querySelector('#product-list');
        if (productListElement) {
          productListElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      // Nếu điều hướng đến trang khác, reset hash và sử dụng navigate bình thường
      if (isNavigatingToProductPage && !path.includes('#')) {
        path = `${path}#all`; // Mặc định chọn 'all' khi vào trang sản phẩm
      }
      
      navigate(path);
      
      // Cuộn lên đầu trang sau khi điều hướng
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    }

  };
  
  // Toggle categories visibility
  const toggleCategories = () => {
    setShowCategories(!showCategories);

  };
  

  
  return (
    <>
      {/* Green menu bar with DANH MỤC SẢN PHẨM and navigation */}
      <div className={`main-menu-wrapper ${isScrolled ? 'scrolled' : ''}`}>
        <Container fluid className="p-0">
          <Row className="g-0">
            <Col xs={12} className="main-menu-bar">
              <div className="menu-category-title" onClick={toggleCategories}>
                <i className="fas fa-bars me-2"></i>
                <span className="category-title-text">DANH MỤC SẢN PHẨM</span>
              </div>
              <div className="main-navigation">
                <ul className="nav-links">
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/'); }}>Trang chủ</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/san-pham'); }}>Sản phẩm</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/tai-lieu-ky-thuat'); }}>Tài liệu kỹ thuật</a></li>
                  <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('/lien-he'); }}>Liên Hệ Mua Hàng</a></li>
                </ul>
              </div>
              {isCartEnabled && (
                <div className="cart-button">
                  <Button variant="success" onClick={showCart} className="cart-btn">
                    <i className="fa fa-shopping-cart"></i>
                    {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                  </Button>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      {/* Main content with categories and banner */}
      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Left sidebar with categories */}
          <Col md={3} className={`sidebar-categories ${showCategories ? 'show' : ''}`}>
            <ul className="category-links">
              {categories.map((category) => (
                <li key={category.id}>
                  <a 
                    href="#" 
                    className="category-link"
                    onClick={(e) => { 
                      e.preventDefault(); 
                      handleNavigation(`/san-pham#${category.id}`);
                      setShowCategories(false);
                    }}
                  >
                    <span className="category-icon">
                      <i className="fas fa-leaf"></i>
                    </span>
                    <span className="category-name">{category.name}</span>
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
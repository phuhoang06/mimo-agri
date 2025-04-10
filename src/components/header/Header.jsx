import React, { useState } from 'react';
import { Navbar, Nav, Container, Offcanvas } from 'react-bootstrap';
import TopBar from './TopBar';
import LogoSection from './LogoSection';
import MainMenu from './MainMenu';
import ContentArea from './ContentArea';
import CartModal from '../cart/CartModal';
import MobileHeader from './MobileHeader';
import { useResponsive } from '../../utils/responsive';

function Header() {
  const { isMobile, isTablet } = useResponsive();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleCloseMobileMenu = () => setShowMobileMenu(false);
  const handleShowMobileMenu = () => setShowMobileMenu(true);

  // Style cho Offcanvas để đồng bộ với thiết kế chung
  const offcanvasStyle = {
    maxWidth: '80%',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  };

  return (
    <div className="header-bar">
      {/* Mobile header với sticky effect */}
      {isMobile && <MobileHeader onMenuClick={handleShowMobileMenu} />}
      
      {/* Desktop header */}
      {!isMobile && (
        <>
          <TopBar />
          <LogoSection />
          <MainMenu />
        </>
      )}
      
      {/* Menu cho mobile sử dụng Offcanvas */}
      <Offcanvas 
        show={showMobileMenu} 
        onHide={handleCloseMobileMenu} 
        placement="start"
        style={offcanvasStyle}
      >
        <Offcanvas.Header closeButton className="bg-success text-white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            <MainMenu mobile={true} onItemClick={handleCloseMobileMenu} />
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      
      <ContentArea />
      <CartModal />
      
      {/* Script for Bootstrap carousel - chỉ chạy khi không phải ứng dụng React native hoặc SSR */}
      {typeof document !== 'undefined' && (
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
      )}
    </div>
  );
}

export default Header; 
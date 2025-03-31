import React, { useState, useEffect, useRef } from 'react';
import TopBar from './TopBar';
import LogoSection from './LogoSection';
import MainMenu from './MainMenu';
import CartModal from '../cart/CartModal';
import { isFeatureEnabled, FEATURE_NAMES } from '../../utils/featureFlags';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isCartEnabled = isFeatureEnabled(FEATURE_NAMES.SHOPPING_CART);
  const mobileMenuRef = useRef(null);
  
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

  // Xử lý đóng menu khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && 
          !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('.mobile-menu-btn')) {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="header-bar">
      <TopBar />
      <div ref={mobileMenuRef}>
        <LogoSection 
          isMobile={isMobile} 
          mobileMenuOpen={mobileMenuOpen} 
          toggleMobileMenu={toggleMobileMenu} 
        />
      </div>
      <MainMenu />
      
      {isCartEnabled && <CartModal />}
      
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
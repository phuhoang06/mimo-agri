import React, { useState, useEffect } from 'react';
import TopBar from './TopBar';
import LogoSection from './LogoSection';
import MainMenu from './MainMenu';
import CartModal from '../cart/CartModal';

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="header-bar">
      <TopBar />
      <LogoSection 
        isMobile={isMobile} 
        mobileMenuOpen={mobileMenuOpen} 
        toggleMobileMenu={toggleMobileMenu} 
      />
      <MainMenu />
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
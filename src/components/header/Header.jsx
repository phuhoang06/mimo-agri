import React from 'react';
import TopBar from './TopBar';
import LogoSection from './LogoSection';
import MainMenu from './MainMenu';
import ContentArea from './ContentArea';
import CartModal from '../cart/CartModal';

function Header() {
  return (
    <div className="header-bar">
      <TopBar />
      <LogoSection />
      <MainMenu />
      <ContentArea />
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
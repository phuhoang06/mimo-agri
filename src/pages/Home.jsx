import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import VideoCarousel from '../components/video/VideoCarousel.jsx';
import TechnicalDocGrid from '../components/technical/TechnicalDocGrid.jsx';
import { Section, Card } from '../components/ui';
import { ProductSection } from '../components/sections';
import { 
  allProducts,
  topSellingProducts, 
  newProducts,
  getUniqueProducts 
} from '../utils/products';

// Import product images
import product1 from '../assets/product/product1.png';
import product2 from '../assets/product/product2.png';
import product3 from '../assets/product/product3.png';
import product4 from '../assets/product/product4.png';

function Home() {
  const navigate = useNavigate();
  const allProductsRef = useRef(null);
  const videoSectionRef = useRef(null);
  const guidesCareRef = useRef(null);
  
  // Loại bỏ trùng lặp để hiển thị trang "Tất cả sản phẩm"
  const uniqueProducts = getUniqueProducts(allProducts);
  
  // Function to handle product page navigation with smooth scroll
  const handleProductsNav = () => {
    navigate('/san-pham');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  // Function to navigate to videos page
  const handleVideosNav = () => {
    navigate('/videos');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  // Function to navigate to technical documents page
  const handleTechnicalDocsNav = () => {
    navigate('/tai-lieu-ky-thuat');
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };
  
  // Function to scroll to section 
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  
  return (
    <>
      <Header />
      
      {/* SẢN PHẨM BÁN CHẠY */}
      <ProductSection 
        id="top-selling" 
        title="SẢN PHẨM BÁN CHẠY"
        products={topSellingProducts}
        limit={5}
      />

      {/* TẤT CẢ SẢN PHẨM */}
      <ProductSection 
        id="all-products" 
        title="TẤT CẢ SẢN PHẨM"
        products={uniqueProducts}
        limit={10}
        sectionRef={allProductsRef}
        actionButton={true}
        actionButtonText="xem thêm"
        onActionButtonClick={handleProductsNav}
      />

      {/* VIDEO SECTION */}
      <Section 
        id="video-section" 
        title="VIDEO" 
        sectionRef={videoSectionRef}
        actionButton={true}
        actionButtonText="xem thêm"
        onActionButtonClick={handleVideosNav}
      >
        <div className="mb-4">
          <VideoCarousel limit={5} />
        </div>
      </Section>

      {/* HƯỚNG DẪN VÀ CHĂM SÓC */}
      <Section 
        id="guides-care" 
        title="HƯỚNG DẪN VÀ CHĂM SÓC" 
        sectionRef={guidesCareRef}
        actionButton={true}
        actionButtonText="xem thêm"
        onActionButtonClick={handleTechnicalDocsNav}
      >
        <TechnicalDocGrid limit={5} />
      </Section>

 
   

      <Footer />
    </>
  );
}

export default Home;
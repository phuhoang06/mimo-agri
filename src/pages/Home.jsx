import React, { useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import { MainLayout } from '../components/layouts';
import VideoCarousel from '../components/video/VideoCarousel.jsx';
import TechnicalDocList from '../components/technical/TechnicalDocList.jsx';
import { Section, Card } from '../components/ui';
import { ProductSection } from '../components/sections';
import { useScrollNavigation } from '../hooks';
import { 
  allProducts,
  topSellingProducts, 
  newProducts
} from '../data/products/index';

// Import product images
import product1 from '../assets/product/chai-xit/1.png';
import product2 from '../assets/product/tam-bay-con-trung/1.png';
import product3 from '../assets/product/nap-bay/1.png';
import product4 from '../assets/product/tinh-dau/1.png';

function Home() {
  const allProductsRef = useRef(null);
  const videoSectionRef = useRef(null);
  const guidesCareRef = useRef(null);
  
  const { navigateWithScroll, scrollToRef } = useScrollNavigation();
  
  // Lấy tất cả sản phẩm
  const products = allProducts();
  
  // Function to handle product page navigation with smooth scroll
  const handleProductsNav = () => navigateWithScroll('/san-pham');
  
  // Function to navigate to videos page
  const handleVideosNav = () => navigateWithScroll('/videos');
  
  // Function to navigate to technical documents page
  const handleTechnicalDocsNav = () => navigateWithScroll('/tai-lieu-ky-thuat');
  
  return (
    <MainLayout>
      {/* SẢN PHẨM BÁN CHẠY */}
      <ProductSection 
        id="top-selling" 
        title="SẢN PHẨM BÁN CHẠY"
        products={topSellingProducts()}
        limit={5}
      />

      {/* TẤT CẢ SẢN PHẨM */}
      <ProductSection 
        id="all-products" 
        title="TẤT CẢ SẢN PHẨM"
        products={products}
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
        <VideoCarousel limit={4} />
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
        <TechnicalDocList limit={5} />
      </Section>
    </MainLayout>
  );
}

export default Home;
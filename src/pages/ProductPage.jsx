import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { categories } from '../data/categories';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import ProductCard from '../components/product/ProductCard.jsx';

const ProductPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if device is mobile
  useEffect(() => {
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
    const hash = location.hash.replace('#', '');
    const category = categories.find(cat => cat.id === hash);
    if (category) {
      setActiveCategory(category);
      // Here you would typically fetch products for this category
      // For now, we'll use dummy data
      setProducts([
        {
          id: 1,
          title: 'Sản phẩm mẫu 1',
          price: 100000,
          oldPrice: 120000,
          rating: 4,
          img: 'https://via.placeholder.com/150'
        },
        {
          id: 2,
          title: 'Sản phẩm mẫu 2',
          price: 200000,
          oldPrice: 250000,
          rating: 5,
          img: 'https://via.placeholder.com/150'
        },
        {
          id: 3,
          title: 'Sản phẩm mẫu 3',
          price: 150000,
          oldPrice: 180000,
          rating: 3,
          img: 'https://via.placeholder.com/150'
        },
        {
          id: 4,
          title: 'Sản phẩm mẫu 4',
          price: 300000,
          oldPrice: 350000,
          rating: 4,
          img: 'https://via.placeholder.com/150'
        }
      ]);
    }
  }, [location.hash]);

  return (
    <>
      <Header />
      <Container fluid className="page-content-container px-3 px-md-4 mt-4">
        <Row>
          {/* Category sidebar - hidden on mobile */}
          {!isMobile && (
            <Col md={3}>
              <div className="category-sidebar sidebar-block">
                <h5 className="sidebar-title">Danh mục sản phẩm</h5>
                <ul className="category-menu-list">
                  {categories.map((category) => (
                    <li key={category.id} className="menu-item">
                      <a 
                        href={`#${category.id}`}
                        className={`menu-link ${activeCategory?.id === category.id ? 'active' : ''}`}
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Col>
          )}
          
          {/* Mobile dropdown for categories - only visible on mobile */}
          {isMobile && (
            <div className="mobile-category-dropdown mb-3">
              <select 
                className="form-select" 
                value={activeCategory?.id || ''}
                onChange={(e) => window.location.hash = e.target.value}
              >
                <option value="" disabled>Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          
          {/* Products display */}
          <Col md={!isMobile ? 9 : 12}>
            {activeCategory && (
              <div className="category-container">
                <h2 className="category-title">{activeCategory.name}</h2>
                <p className="category-description mb-3">{activeCategory.description}</p>
                <Row className="g-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} className="col-6 col-md-4 col-lg-3" />
                  ))}
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default ProductPage; 
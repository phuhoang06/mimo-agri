import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { categories } from '../data/categories';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import Pagination from '../components/ui/Pagination.jsx';

const ProductPage = () => {
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  
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
      
      // Đặt lại trang về 1 khi thay đổi danh mục
      setCurrentPage(1);
      
      // Ở đây chúng ta sẽ mô phỏng việc lấy nhiều sản phẩm hơn
      // Trong ứng dụng thực tế, bạn sẽ lấy dữ liệu từ API hoặc nguồn khác
      const dummyProducts = [];
      for (let i = 1; i <= 30; i++) {
        dummyProducts.push({
          id: i,
          title: `${category.name} - Sản phẩm ${i}`,
          price: 100000 + (i * 10000),
          oldPrice: 120000 + (i * 15000),
          rating: Math.floor(Math.random() * 5) + 1,
          img: 'https://via.placeholder.com/150'
        });
      }
      setProducts(dummyProducts);
    }
  }, [location.hash]);

  // Tính toán sản phẩm cho trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  
  // Tính tổng số trang
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Xử lý khi thay đổi trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    setCurrentPage(pageNumber);
    
    // Cuộn lên đầu danh sách sản phẩm
    const productListElement = document.querySelector('.category-container');
    if (productListElement) {
      productListElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Phần renderPaginationItems thay thành 
  const renderProductPagination = () => {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isMobile={isMobile}
      />
    );
  };

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
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} className="col-6 col-md-4 col-lg-2-4" />
                  ))}
                </Row>
                
                {/* Phân trang */}
                {totalPages > 1 && (
                  <div className="d-flex justify-content-center mt-4">
                    {renderProductPagination()}
                  </div>
                )}
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
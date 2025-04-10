import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Tab, Nav, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import ProductCard from '../components/product/ProductCard';
import { useResponsive } from '../utils/responsive';
import { 
  allProducts, 
  topSellingProducts, 
  newProducts,
  productCategories as predefinedCategories,
  getProductsByCategory,
  searchProducts,
  filterProductsByPrice,
  sortProducts,
  getUniqueProducts
} from '../utils/products';

function Products() {
  const { isMobile, isTablet } = useResponsive();
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 500000 });
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  
  // Loại bỏ các sản phẩm trùng lặp
  const uniqueProducts = getUniqueProducts(allProducts);
  
  // Các danh mục chính
  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', products: uniqueProducts },
    { id: 'top-selling', name: 'Sản phẩm bán chạy', products: topSellingProducts },
    { id: 'new-products', name: 'Sản phẩm mới', products: newProducts },
  ];

  useEffect(() => {
    // Mặc định hiển thị tất cả sản phẩm khi trang mới được tải
    setFilteredProducts(uniqueProducts);
    
    // Kiểm tra hash URL để lọc theo danh mục nếu có
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        // Kiểm tra xem hash có khớp với một trong các danh mục không
        const category = predefinedCategories.find(cat => cat.id === hash);
        if (category) {
          const categoryProducts = getProductsByCategory(hash);
          setFilteredProducts(categoryProducts);
        }
      }
    };
    
    // Xử lý hash ban đầu khi trang được tải
    handleHashChange();
    
    // Thêm event listener cho hash change
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  // Xử lý lọc và sắp xếp sản phẩm
  useEffect(() => {
    let results = [...allProducts];
    
    // Lọc theo danh mục
    if (selectedCategory !== 'all') {
      results = results.filter(product => product.category === selectedCategory);
    }
    
    // Lọc theo khoảng giá
    results = results.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    // Lọc theo từ khóa tìm kiếm
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(product => 
        product.title.toLowerCase().includes(term) || 
        product.category.toLowerCase().includes(term)
      );
    }
    
    // Sắp xếp sản phẩm
    switch(sortOption) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        results.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'popularity':
        results.sort((a, b) => b.sold - a.sold);
        break;
      default:
        // Mặc định là sắp xếp theo rating
        results.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(results);
  }, [selectedCategory, priceRange, searchTerm, sortOption]);

  // Đóng filter sidebar trên mobile khi có sự thay đổi
  useEffect(() => {
    if (isMobile && showFilters) {
      setShowFilters(false);
    }
  }, [selectedCategory, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value);
    setPriceRange({ ...priceRange, max: value });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Filter sidebar cho desktop
  const renderFilterSidebar = () => (
    <div className="filter-sidebar p-3 border rounded bg-light">
      <h5 className="mb-3">Danh mục sản phẩm</h5>
      <Form.Group className="mb-4">
        <Form.Check
          type="radio"
          label="Tất cả sản phẩm"
          name="category"
          id="category-all"
          checked={selectedCategory === 'all'}
          onChange={() => handleCategoryChange('all')}
          className="mb-2"
        />
        {categories.map((category, index) => (
          <Form.Check
            key={index}
            type="radio"
            label={category.name}
            name="category"
            id={`category-${index}`}
            checked={selectedCategory === category.id}
            onChange={() => handleCategoryChange(category.id)}
            className="mb-2"
          />
        ))}
      </Form.Group>

      <h5 className="mb-3">Giá</h5>
      <Form.Group className="mb-4">
        <Form.Label>
          Tối đa: {priceRange.max.toLocaleString()}₫
        </Form.Label>
        <Form.Range
          min={0}
          max={500000}
          step={10000}
          value={priceRange.max}
          onChange={handlePriceChange}
        />
      </Form.Group>
    </div>
  );

  return (
    <>
      <Header />
      
      <Container fluid className="px-3 px-md-4 mt-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
          <h1 className="h3 mb-3 mb-md-0">Cửa hàng sản phẩm</h1>
          
          <div className="d-flex gap-2">
            {isMobile && (
              <Button
                variant="outline-secondary"
                onClick={() => setShowFilters(true)}
                className="me-2"
              >
                <i className="fa fa-filter me-1"></i> Lọc
              </Button>
            )}

            <Form.Select 
              onChange={handleSortChange} 
              value={sortOption}
              className="sort-select"
              size={isMobile ? "sm" : "md"}
            >
              <option value="default">Sắp xếp theo</option>
              <option value="popularity">Phổ biến nhất</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
              <option value="name-asc">Tên: A-Z</option>
              <option value="name-desc">Tên: Z-A</option>
            </Form.Select>
          </div>
        </div>

        <Row>
          {/* Filter sidebar cho desktop */}
          {!isMobile && (
            <Col lg={3} className="d-none d-lg-block mb-4">
              {renderFilterSidebar()}
            </Col>
          )}
          
          {/* Danh sách sản phẩm */}
          <Col lg={isMobile ? 12 : 9}>
            <div className="mb-4">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm sản phẩm..."
                onChange={handleSearch}
                value={searchTerm}
              />
            </div>
            
            <Row className="g-3">
              {filteredProducts.map((product, index) => (
                <ProductCard 
                  key={index} 
                  product={product}
                  cols={{ xs: 6, sm: 6, md: 4, lg: 4 }}
                />
              ))}
              
              {filteredProducts.length === 0 && (
                <div className="col-12 text-center p-5">
                  <p className="mb-0">Không tìm thấy sản phẩm phù hợp.</p>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
      
      {/* Filter Offcanvas cho mobile */}
      <Offcanvas 
        show={showFilters} 
        onHide={() => setShowFilters(false)} 
        placement="start"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Lọc sản phẩm</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {renderFilterSidebar()}
        </Offcanvas.Body>
      </Offcanvas>
      
      <Footer />
    </>
  );
}

export default Products; 
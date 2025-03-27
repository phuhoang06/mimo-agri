import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Form, Button, Tab, Nav } from 'react-bootstrap';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000000 });
  const [sortBy, setSortBy] = useState('default');
  const [activeCategory, setActiveCategory] = useState('all');
  const productListRef = useRef(null);
  
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
          
          // Scroll to product list after category change
          setTimeout(() => {
            if (productListRef.current) {
              productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 200);
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

  // Lọc sản phẩm dựa trên thanh tìm kiếm và các bộ lọc
  const handleSearch = () => {
    // Xác định bộ sản phẩm cơ sở dựa trên danh mục đang chọn
    let baseProducts = uniqueProducts;
    if (activeCategory !== 'all') {
      const category = categories.find(cat => cat.id === activeCategory);
      if (category) {
        baseProducts = category.products;
      }
    }
    
    // Lọc theo từ khóa tìm kiếm
    let results = searchTerm ? searchProducts(searchTerm) : [...baseProducts];
    
    // Lọc theo khoảng giá
    results = filterProductsByPrice(results, priceRange.min, priceRange.max);
    
    // Sắp xếp sản phẩm
    if (sortBy !== 'default') {
      results = sortProducts(results, sortBy);
    }
    
    setFilteredProducts(results);
    
    // Scroll to product list after applying filters
    setTimeout(() => {
      if (productListRef.current) {
        productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  // Áp dụng bộ lọc khi có thay đổi
  useEffect(() => {
    handleSearch();
  }, [searchTerm, priceRange, sortBy, activeCategory]);

  // Chọn danh mục
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    
    // Scroll to product list after category selection
    setTimeout(() => {
      if (productListRef.current) {
        productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 200);
  };

  return (
    <>
      <Header />
      
      <Container fluid className="page-content-container mt-4 px-3 px-md-4">
        <Row>
          {/* Sidebar - Bộ lọc */}
          <Col lg={3} className="mb-4">
            <div className="sidebar-block mb-4">
              <h5 className="sidebar-title">Tìm kiếm</h5>
              <Form.Control 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-3"
              />
            </div>

            <div className="sidebar-block mb-4">
              <h5 className="sidebar-title">Giá</h5>
              <div className="price-range mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Control 
                    type="number" 
                    placeholder="Từ" 
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: parseInt(e.target.value) || 0})}
                    className="me-2"
                  />
                  <Form.Control 
                    type="number" 
                    placeholder="Đến" 
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: parseInt(e.target.value) || 1000000})}
                  />
                </div>
              </div>
            </div>

            <div className="sidebar-block mb-4">
              <h5 className="sidebar-title">Sắp xếp theo</h5>
              <Form.Select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="popular">Phổ biến nhất</option>
              </Form.Select>
            </div>

            <div className="sidebar-block">
              <h5 className="sidebar-title">Danh mục sản phẩm</h5>
              <ul className="category-menu-list">
                {predefinedCategories.map((category) => (
                  <li key={category.id} className="menu-item">
                    <a 
                      href={`#${category.id}`} 
                      className="menu-link"
                      onClick={(e) => {
                        const categoryProducts = getProductsByCategory(category.id);
                        setFilteredProducts(categoryProducts);
                      }}
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Col>

          {/* Nội dung chính - Hiển thị sản phẩm */}
          <Col lg={9} ref={productListRef}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="m-0">Tất cả sản phẩm</h2>
              <div>
                <span>Hiển thị {filteredProducts.length} sản phẩm</span>
              </div>
            </div>

            <Tab.Container defaultActiveKey="all" activeKey={activeCategory} onSelect={handleCategorySelect}>
              <Nav variant="tabs" className="mb-3">
                {categories.map(category => (
                  <Nav.Item key={category.id}>
                    <Nav.Link eventKey={category.id}>
                      {category.name}
                    </Nav.Link>
                  </Nav.Item>
                ))}
              </Nav>

              <Tab.Content>
                {categories.map(category => (
                  <Tab.Pane key={category.id} eventKey={category.id}>
                    {filteredProducts.length > 0 ? (
                      <Row className="g-3">
                        {filteredProducts.map((product, index) => (
                          <ProductCard key={index} product={product} className="col-6 col-sm-4 col-md-3 col-lg-2-4" />
                        ))}
                      </Row>
                    ) : (
                      <div className="text-center py-5">
                        <p className="text-muted">Không tìm thấy sản phẩm nào phù hợp với bộ lọc đã chọn.</p>
                      </div>
                    )}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default Products; 
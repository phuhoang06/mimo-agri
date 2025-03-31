import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Tab, Nav, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/header/Header.jsx';
import Footer from '../components/footer/Footer.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import FilterSidebar from '../components/sidebar/FilterSidebar.jsx';
import Pagination from '../components/ui/Pagination.jsx';
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
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [isMobileView, setIsMobileView] = useState(false);
  const productListRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Loại bỏ các sản phẩm trùng lặp
  const uniqueProducts = getUniqueProducts(allProducts);
  
  // Các danh mục chính
  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm', products: uniqueProducts },
    { id: 'top-selling', name: 'Sản phẩm bán chạy', products: topSellingProducts },
    { id: 'new-products', name: 'Sản phẩm mới', products: newProducts },
  ];

  // Thêm danh mục sản phẩm từ predefinedCategories
  const categoriesForSidebar = predefinedCategories.map(category => ({
    id: category.id,
    name: category.name,
    onClick: (e) => {
      e.preventDefault();
      handleCategoryFilter(category.id);
    }
  }));

  // Kiểm tra thiết bị di động
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    // Initial check
    checkMobileView();
    
    // Add resize listener
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // Xử lý query params từ URL khi trang được tải
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    
    // Lấy tham số search từ URL (nếu có)
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
    
    // Lấy tham số category từ URL (nếu có)
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    
    // Lấy tham số sort từ URL (nếu có)
    const sortParam = searchParams.get('sort');
    if (sortParam) {
      setSortBy(sortParam);
    }
    
    // Lấy tham số price_min và price_max từ URL (nếu có)
    const minPrice = searchParams.get('price_min');
    const maxPrice = searchParams.get('price_max');
    if (minPrice || maxPrice) {
      setPriceRange({
        min: minPrice ? parseInt(minPrice) : 0,
        max: maxPrice ? parseInt(maxPrice) : 1000000
      });
    }

    // Lấy tham số page từ URL (nếu có)
    const pageParam = searchParams.get('page');
    if (pageParam) {
      setCurrentPage(parseInt(pageParam));
    } else {
      setCurrentPage(1); // Reset về trang 1 nếu không có tham số page
    }
  }, [location.search]);

  // Xử lý hash parameter từ URL (được truyền từ MainMenu)
  useEffect(() => {
    // Lấy hash từ URL (nếu có)
    const hash = location.hash.replace('#', '');
    if (hash) {
      // Kiểm tra xem hash có phải là một trong các danh mục được định nghĩa không
      const isValidCategory = [...predefinedCategories.map(cat => cat.id), 'all', 'top-selling', 'new-products'].includes(hash);
      
      if (isValidCategory) {
        setActiveCategory(hash);
        
        // Reset các bộ lọc khác nếu chọn danh mục từ hash
        setSearchTerm('');
        setPriceRange({ min: 0, max: 1000000 });
        setSortBy('default');
        setCurrentPage(1); // Reset về trang 1 khi chọn danh mục mới
      }
    }
  }, [location.hash]);

  // Lọc sản phẩm khi các tham số lọc thay đổi
  useEffect(() => {
    let productsToDisplay = [];
    
    // Lấy danh sách sản phẩm dựa vào danh mục đang chọn
    if (activeCategory === 'all') {
      productsToDisplay = uniqueProducts;
    } else if (activeCategory === 'top-selling') {
      productsToDisplay = topSellingProducts;
    } else if (activeCategory === 'new-products') {
      productsToDisplay = newProducts;
    } else {
      productsToDisplay = getProductsByCategory(activeCategory);
    }
    
    // Áp dụng tìm kiếm nếu có từ khóa
    if (searchTerm.trim()) {
      // Nếu đang tìm kiếm, sử dụng tất cả sản phẩm làm nguồn tìm kiếm
      const searchResults = searchProducts(searchTerm);
      
      // Nếu cũng đang lọc theo danh mục cụ thể (không phải all), 
      // thì lọc thêm kết quả tìm kiếm theo danh mục
      if (activeCategory !== 'all' && activeCategory !== 'top-selling' && activeCategory !== 'new-products') {
        productsToDisplay = searchResults.filter(
          product => product.categoryId === activeCategory
        );
      } else {
        productsToDisplay = searchResults;
      }
    }
    
    // Áp dụng lọc theo giá
    productsToDisplay = filterProductsByPrice(
      productsToDisplay, 
      priceRange.min, 
      priceRange.max
    );
    
    // Áp dụng sắp xếp
    if (sortBy !== 'default') {
      productsToDisplay = sortProducts(productsToDisplay, sortBy);
    }
    
    setFilteredProducts(productsToDisplay);
    
    // Khi các bộ lọc thay đổi (trừ page), reset về trang 1
    if (!location.search.includes('page=')) {
      setCurrentPage(1);
    }
    
    // Cuộn về đầu danh sách sản phẩm khi thay đổi bộ lọc
      if (productListRef.current) {
        productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    
    // Cập nhật URL với các tham số lọc
    updateUrlWithFilters();
  }, [activeCategory, searchTerm, priceRange, sortBy]);
  
  // Cập nhật URL với các tham số lọc hiện tại
  const updateUrlWithFilters = () => {
    const searchParams = new URLSearchParams();
    
    // Thêm tham số search nếu có
    if (searchTerm.trim()) {
      searchParams.set('search', searchTerm);
    }
    
    // Thêm tham số category nếu không phải 'all'
    if (activeCategory !== 'all') {
      searchParams.set('category', activeCategory);
    }
    
    // Thêm tham số sort nếu không phải 'default'
    if (sortBy !== 'default') {
      searchParams.set('sort', sortBy);
    }
    
    // Thêm tham số price_min và price_max nếu không phải giá trị mặc định
    if (priceRange.min > 0) {
      searchParams.set('price_min', priceRange.min);
    }
    
    if (priceRange.max < 1000000) {
      searchParams.set('price_max', priceRange.max);
    }

    // Thêm tham số page nếu không phải trang 1
    if (currentPage > 1) {
      searchParams.set('page', currentPage);
    }
    
    // Cập nhật URL mà không làm tải lại trang
    const newUrl = `${location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    navigate(newUrl, { replace: true });
  };

  // Xử lý khi chọn danh mục
  const handleCategorySelect = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1); // Reset về trang 1 khi chọn danh mục mới
  };
  
  // Xử lý khi lọc theo danh mục từ sidebar
  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
    // Reset các bộ lọc khác về mặc định
    setSearchTerm('');
    setPriceRange({ min: 0, max: 1000000 });
    setSortBy('default');
    setCurrentPage(1); // Reset về trang 1 khi lọc theo danh mục
  };
  
  // Xử lý khi thay đổi sắp xếp
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset về trang 1 khi thay đổi sắp xếp
  };

  // Xử lý khi thay đổi trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    
    setCurrentPage(pageNumber);
    
    // Cập nhật URL với trang mới
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('page', pageNumber);
    const newUrl = `${location.pathname}?${searchParams.toString()}${location.hash}`;
    navigate(newUrl, { replace: true });
    
    // Cuộn lên đầu danh sách sản phẩm
      if (productListRef.current) {
        productListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  // Tính toán các sản phẩm cần hiển thị trên trang hiện tại
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Tạo các mục phân trang
  const renderProductPagination = () => {
    return (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        isMobile={isMobileView}
      />
    );
  };

  // Hiển thị cho điện thoại và máy tính bảng
  const renderMobileProductList = () => {
    return (
      <div className="mobile-product-container" ref={productListRef} id="product-list">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="fs-4 m-0">Sản phẩm</h2>
          <Form.Select 
            value={sortBy}
            onChange={handleSortChange}
            className="form-select-sm"
            style={{ width: 'auto' }}
          >
            <option value="default">Sắp xếp</option>
            <option value="price-asc">Giá tăng dần</option>
            <option value="price-desc">Giá giảm dần</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="newest">Mới nhất</option>
          </Form.Select>
        </div>
        
        {/* Viền bọc cho active category */}
        <div className="category-pills-container mb-3">
          <div className="category-pills d-flex overflow-auto">
            {categories.map(category => (
              <div 
                key={category.id} 
                className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                {category.name}
              </div>
            ))}
            {predefinedCategories.map(category => (
              <div 
                key={category.id} 
                className={`category-pill ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryFilter(category.id)}
              >
                {category.name}
              </div>
            ))}
          </div>
        </div>
        
        {searchTerm && (
          <div className="alert alert-info mb-3 py-2">
            <small>
              <i className="fas fa-search me-1"></i>
              Kết quả tìm kiếm: <strong>"{searchTerm}"</strong>
            </small>
          </div>
        )}
        
        {filteredProducts.length > 0 ? (
          <>
            <Row className="g-3">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Row>
            
            {/* Phân trang */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-between align-items-center mt-3">
                {renderProductPagination()}
                <small className="text-muted">
                  {indexOfFirstProduct + 1}-{Math.min(indexOfLastProduct, filteredProducts.length)} / {filteredProducts.length} sản phẩm
                </small>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <i className="fas fa-search fa-2x mb-2 text-muted"></i>
            <h5>Không tìm thấy sản phẩm</h5>
            <p className="text-muted small">Vui lòng thử từ khóa khác hoặc bỏ bớt bộ lọc</p>
          </div>
        )}
      </div>
    );
  };

  // Hiển thị cho desktop
  const renderDesktopProductList = () => {
    return (
      <Col lg={9} ref={productListRef} id="product-list">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0">Tất cả sản phẩm</h2>
          <div className="d-flex align-items-center">
            <Form.Select 
              value={sortBy}
              onChange={handleSortChange}
              className="form-select-sm me-2"
              style={{ width: 'auto' }}
            >
              <option value="default">Sắp xếp mặc định</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="name-asc">Tên A-Z</option>
              <option value="name-desc">Tên Z-A</option>
              <option value="newest">Sản phẩm mới nhất</option>
              <option value="popular">Sản phẩm bán chạy</option>
            </Form.Select>
            <span className="ms-2">Hiển thị {filteredProducts.length} sản phẩm</span>
          </div>
        </div>

        <Tab.Container activeKey={activeCategory} onSelect={handleCategorySelect}>
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
            <Tab.Pane eventKey={activeCategory}>
              {searchTerm && (
                <div className="alert alert-info mb-3">
                  <i className="fas fa-search me-2"></i>
                  Kết quả tìm kiếm cho: <strong>"{searchTerm}"</strong>
                </div>
              )}
              
              {filteredProducts.length > 0 ? (
                <>
                  <Row className="g-3">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </Row>
                  
                  {/* Phân trang */}
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-center mt-4">
                      {renderProductPagination()}
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-5">
                  <i className="fas fa-search fa-3x mb-3 text-muted"></i>
                  <h4>Không tìm thấy sản phẩm nào</h4>
                  <p className="text-muted">Vui lòng thử lại với từ khóa khác hoặc bỏ bớt bộ lọc</p>
                </div>
              )}
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Col>
    );
  };

  return (
    <>
      <Header />
      
      <Container fluid className="page-content-container mt-4 px-3 px-md-4">
        {isMobileView ? (
          <>
            {/* Hiển thị cho mobile/tablet */}
            <div className="filter-toggle-container mb-3">
              <button className="btn btn-sm btn-outline-secondary w-100" 
                      data-bs-toggle="collapse" 
                      data-bs-target="#mobileSidebar"
                      aria-expanded="false">
                <i className="fas fa-filter me-1"></i> Lọc sản phẩm
              </button>
            </div>
            
            <div className="collapse" id="mobileSidebar">
              <FilterSidebar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
                categories={categoriesForSidebar}
                activeCategory={activeCategory}
                className="mb-3"
              />
            </div>
            
            {renderMobileProductList()}
          </>
        ) : (
        <Row>
          {/* Sidebar - Bộ lọc */}
          <Col lg={3} className="mb-4">
            <FilterSidebar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              sortBy={sortBy}
              setSortBy={setSortBy}
              categories={categoriesForSidebar}
                activeCategory={activeCategory}
            />
          </Col>

          {/* Nội dung chính - Hiển thị sản phẩm */}
            {renderDesktopProductList()}
                      </Row>
        )}
      </Container>

      <Footer />
    </>
  );
}

export default Products;
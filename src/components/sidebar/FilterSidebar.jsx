import React from 'react';
import { Form } from 'react-bootstrap';
import { SearchBar, SidebarBlock } from '../ui';
import { PriceRange } from '../form';
import { useLocation } from 'react-router-dom';

function FilterSidebar({ 
  searchTerm, 
  setSearchTerm, 
  priceRange, 
  setPriceRange, 
  sortBy, 
  setSortBy, 
  categories = [],
  activeCategory
}) {
  const location = useLocation();

  // Xác định danh mục đang active từ URL hoặc activeCategory prop
  const getActiveCategoryId = () => {
    // Xem xét hash từ URL trước
    const hash = location.hash.replace('#', '');
    
    if (hash && categories.find(cat => cat.id === hash)) {
      return hash;
    }
    
    // Sử dụng activeCategory nếu không có hash
    return activeCategory;
  };
  
  const currentActiveCategory = getActiveCategoryId();

  return (
    <>
     <SidebarBlock>
        <SearchBar
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SidebarBlock>

      {categories.length > 0 && (
        <SidebarBlock title="Danh mục sản phẩm">
          <ul className="category-menu-list">
            {categories.map((category) => (
              <li key={category.id} className="menu-item">
                <a 
                  href={`#${category.id}`} 
                  className={`menu-link ${currentActiveCategory === category.id ? 'active' : ''}`}
                  onClick={category.onClick}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </SidebarBlock>
      )}
    </>
  );
}

export default FilterSidebar; 
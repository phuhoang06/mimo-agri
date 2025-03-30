import React from 'react';
import { Form } from 'react-bootstrap';
import { SearchBar, SidebarBlock } from '../ui';
import { PriceRange } from '../form';

function FilterSidebar({ 
  searchTerm, 
  setSearchTerm, 
  priceRange, 
  setPriceRange, 
  sortBy, 
  setSortBy, 
  categories = []
}) {
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
                  className="menu-link"
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
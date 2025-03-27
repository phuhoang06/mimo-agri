import React from 'react';
import { Link } from 'react-router-dom';

function CategorySidebar() {
  return (
    <div className="col-lg-3 category-sidebar p-0">
      <div className="sidebar-menu">
        <div className="category-header bg-success text-white p-2 text-center">
          <i className="fas fa-bars me-2"></i>
          <span>DANH MỤC SẢN PHẨM</span>
        </div>
        <div className="sidebar-content border border-top-0">
          <ul className="category-menu-list m-0 p-0 list-unstyled">
            <li className="menu-item border-bottom">
              <Link to="/san-pham#san-pham-ban-chay" className="menu-link d-block p-2 text-decoration-none text-body">Sản phẩm bán chạy</Link>
            </li>
            <li className="menu-item border-bottom">
              <Link to="/san-pham#hat-giong-hoa" className="menu-link d-block p-2 text-decoration-none text-success">Hạt Giống Hoa</Link>
            </li>
            <li className="menu-item border-bottom">
              <Link to="/san-pham#hat-giong-rau-an-cu" className="menu-link d-block p-2 text-decoration-none text-success">Hạt giống rau ăn củ</Link>
            </li>
            <li className="menu-item border-bottom">
              <Link to="/san-pham#hat-giong-rau-an-la" className="menu-link d-block p-2 text-decoration-none text-success">Hạt giống rau ăn lá</Link>
            </li>
            <li className="menu-item border-bottom">
              <Link to="/san-pham#hat-giong-rau-an-qua" className="menu-link d-block p-2 text-decoration-none text-success">Hạt giống rau ăn quả</Link>
            </li>
            <li className="menu-item border-bottom">
              <Link to="/san-pham#hat-giong-rau-gia-vi" className="menu-link d-block p-2 text-decoration-none text-success">Hạt giống rau gia vị</Link>
            </li>
            <li className="menu-item border-bottom">
              <Link to="/san-pham#hat-giong-rau-mam" className="menu-link d-block p-2 text-decoration-none text-success">Hạt giống rau mầm</Link>
            </li>
            <li className="menu-item">
              <Link to="/san-pham#hat-giong-co-chan-nuoi" className="menu-link d-block p-2 text-decoration-none text-success">Hạt giống Cỏ Chăn Nuôi</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CategorySidebar; 
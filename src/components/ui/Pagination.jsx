import React from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

/**
 * Component phân trang tùy chỉnh với xử lý đặc biệt cho mobile
 * 
 * @param {number} currentPage - Trang hiện tại
 * @param {number} totalPages - Tổng số trang
 * @param {function} onPageChange - Hàm xử lý khi thay đổi trang
 * @param {boolean} isMobile - Có phải thiết bị mobile hay không
 * @param {string} className - Class CSS bổ sung (nếu có)
 */
const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  isMobile = false,
  className = '' 
}) => {
  // Kiểm tra giới hạn trang
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    onPageChange(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    
    // Nút Previous với tên trang trên mobile
    items.push(
      <BSPagination.Prev 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="prev"
      >
        {isMobile ? 
          (currentPage > 1 ? `Trang ${currentPage - 1}` : "Trước") : 
          "«"
        }
      </BSPagination.Prev>
    );
    
    // Trong chế độ máy tính bảng và desktop
    if (!isMobile) {
      // Hiển thị trang đầu tiên nếu không gần trang hiện tại
      if (currentPage > 3) {
        items.push(
          <BSPagination.Item key={1} onClick={() => handlePageChange(1)}>
            {1}
          </BSPagination.Item>
        );
        
        // Hiển thị dấu ... nếu cần
        if (currentPage > 4) {
          items.push(<BSPagination.Ellipsis key="ellipsis1" />);
        }
      }
      
      // Trang trước trang hiện tại
      if (currentPage > 1) {
        items.push(
          <BSPagination.Item key={currentPage - 1} onClick={() => handlePageChange(currentPage - 1)}>
            {currentPage - 1}
          </BSPagination.Item>
        );
      }
      
      // Trang hiện tại
      items.push(
        <BSPagination.Item key={currentPage} active>
          {currentPage}
        </BSPagination.Item>
      );
      
      // Trang sau trang hiện tại
      if (currentPage < totalPages) {
        items.push(
          <BSPagination.Item key={currentPage + 1} onClick={() => handlePageChange(currentPage + 1)}>
            {currentPage + 1}
          </BSPagination.Item>
        );
      }
      
      // Hiển thị dấu ... nếu cần
      if (currentPage < totalPages - 3) {
        items.push(<BSPagination.Ellipsis key="ellipsis2" />);
      }
      
      // Hiển thị trang cuối cùng nếu không gần trang hiện tại
      if (currentPage < totalPages - 2 && totalPages > 1) {
        items.push(
          <BSPagination.Item key={totalPages} onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </BSPagination.Item>
        );
      }
    } else {
      // Trong chế độ điện thoại, chỉ hiện thông tin trang hiện tại/tổng số trang
      items.push(
        <BSPagination.Item key="current-info" disabled>
          {currentPage}/{totalPages}
        </BSPagination.Item>
      );
    }
    
    // Nút Next với tên trang trên mobile
    items.push(
      <BSPagination.Next 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || totalPages === 0}
        className="next"
      >
        {isMobile ? 
          (currentPage < totalPages ? `Trang ${currentPage + 1}` : "Sau") : 
          "»"
        }
      </BSPagination.Next>
    );
    
    return items;
  };

  // Nếu không có trang nào thì không hiển thị
  if (totalPages <= 1) return null;

  return (
    <BSPagination className={className}>
      {renderPaginationItems()}
    </BSPagination>
  );
};

export default Pagination; 
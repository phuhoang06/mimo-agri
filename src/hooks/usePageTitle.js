import { useEffect } from 'react';

/**
 * Hook để quản lý tiêu đề trang
 * @param {string} title - Tiêu đề trang
 * @param {string} [suffix=' | Mimo-Agri'] - Hậu tố thêm vào tiêu đề 
 */
const usePageTitle = (title, suffix = ' | Mimo-Agri') => {
  useEffect(() => {
    // Nếu không có title hoặc title là chuỗi rỗng, sử dụng tiêu đề mặc định
    if (!title || title.trim() === '') {
      document.title = 'Mimo Agriculture';
    } else {
      // Ngược lại, sử dụng title + suffix
      document.title = `${title}${suffix}`;
    }
    
    // Cleanup function để reset title khi component unmount
    return () => {
      document.title = 'Mimo Agriculture';
    };
  }, [title, suffix]);
};

export default usePageTitle; 
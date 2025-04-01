import { useNavigate } from 'react-router-dom';

/**
 * Hook tái sử dụng để xử lý điều hướng với smooth scroll
 * @returns {Object} Các function điều hướng
 */
const useScrollNavigation = () => {
  const navigate = useNavigate();

  /**
   * Điều hướng đến đường dẫn cụ thể với smooth scroll
   * @param {string} path - Đường dẫn để điều hướng đến
   * @param {number} delay - Delay trước khi scroll (ms)
   * @param {Object} options - Các tùy chọn scroll
   */
  const navigateWithScroll = (path, delay = 100, options = { top: 0, behavior: 'smooth' }) => {
    navigate(path);
    setTimeout(() => {
      window.scrollTo(options);
    }, delay);
  };

  /**
   * Cuộn đến một phần tử ref
   * @param {React.RefObject} ref - Ref đối tượng để cuộn đến
   * @param {Object} options - Các tùy chọn scroll
   */
  const scrollToRef = (ref, options = { behavior: 'smooth', block: 'start' }) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView(options);
    }
  };

  return {
    navigateWithScroll,
    scrollToRef
  };
};

export default useScrollNavigation; 
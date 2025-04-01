import { useEffect, useState, useCallback } from 'react';

/**
 * Hook tái sử dụng cho các hiệu ứng scroll
 * @param {Object} options - Các tùy chọn
 * @returns {Object} - Trạng thái scroll và các hàm liên quan
 */
const useScrollEffects = (options = {}) => {
  const {
    threshold = 100,
    showAfterScroll = true
  } = options;

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [direction, setDirection] = useState('down');
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  // Cập nhật trạng thái scroll
  const handleScroll = useCallback(() => {
    const currentScrollPos = window.pageYOffset;
    
    // Cập nhật hướng scroll
    if (currentScrollPos > lastScrollPosition) {
      setDirection('down');
    } else {
      setDirection('up');
    }
    
    // Cập nhật vị trí scroll
    setScrollPosition(currentScrollPos);
    setLastScrollPosition(currentScrollPos);

    // Cập nhật trạng thái scroll dựa vào ngưỡng
    if (showAfterScroll) {
      setIsScrolled(currentScrollPos > threshold);
    } else {
      setIsScrolled(currentScrollPos < threshold);
    }
  }, [threshold, showAfterScroll, lastScrollPosition]);

  // Scroll to top
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Scroll to bottom
  const scrollToBottom = useCallback(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }, []);

  // Scroll to a specific element
  const scrollToElement = useCallback((element, options = { behavior: 'smooth', block: 'start' }) => {
    if (element) {
      element.scrollIntoView(options);
    }
  }, []);

  // Đăng ký sự kiện scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {
    isScrolled,
    scrollPosition,
    direction,
    scrollToTop,
    scrollToBottom,
    scrollToElement
  };
};

export default useScrollEffects; 
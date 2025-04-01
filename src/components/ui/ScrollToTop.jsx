import React from 'react';
import { useScrollEffects } from '../../hooks';

function ScrollToTop() {
  const { isScrolled, scrollToTop } = useScrollEffects({ 
    threshold: 200,
    showAfterScroll: true
  });

  return (
    <>
      {isScrolled && (
        <button 
          onClick={scrollToTop} 
          className="scroll-to-top"
          aria-label="Cuộn lên đầu trang"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </>
  );
}

export default ScrollToTop; 
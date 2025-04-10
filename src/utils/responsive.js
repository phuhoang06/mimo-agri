import { useState, useEffect } from 'react';

// Breakpoints for different screen sizes
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};

/**
 * Hook to detect current screen size
 * @returns {Object} containing current screen size and boolean flags for each breakpoint
 */
export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
    breakpoint: 'md'
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      
      // Update screen size state
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < BREAKPOINTS.sm,
        isTablet: width >= BREAKPOINTS.sm && width < BREAKPOINTS.lg,
        isDesktop: width >= BREAKPOINTS.lg && width < BREAKPOINTS.xl,
        isLargeDesktop: width >= BREAKPOINTS.xl,
        breakpoint: width < BREAKPOINTS.sm ? 'xs' : 
                    width < BREAKPOINTS.md ? 'sm' : 
                    width < BREAKPOINTS.lg ? 'md' : 
                    width < BREAKPOINTS.xl ? 'lg' : 'xl'
      });
    }
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures effect is only run on mount and unmount

  return {
    ...windowSize,
    ...screenSize
  };
}

/**
 * Component classes helper for responsive design
 * @param {Object} options - classes for different breakpoints
 * @returns {String} className string based on current breakpoint
 */
export function getResponsiveClasses(options) {
  const { xs, sm, md, lg, xl, base = '' } = options;
  let classes = base;
  
  if (xs) classes += ` ${xs}`;
  if (sm) classes += ` ${sm}`;
  if (md) classes += ` ${md}`;
  if (lg) classes += ` ${lg}`;
  if (xl) classes += ` ${xl}`;
  
  return classes.trim();
}

/**
 * Get grid column classes for Bootstrap responsive grid
 * @param {Object} cols - Number of columns for each breakpoint 
 * @returns {String} Bootstrap grid classes
 */
export function getGridClasses(cols = {}) {
  const { xs = 12, sm, md, lg, xl } = cols;
  
  let classes = `col-${xs}`;
  if (sm) classes += ` col-sm-${sm}`;
  if (md) classes += ` col-md-${md}`;
  if (lg) classes += ` col-lg-${lg}`;
  if (xl) classes += ` col-xl-${xl}`;
  
  return classes;
} 
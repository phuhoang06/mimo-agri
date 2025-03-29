import { useMemo } from 'react';
import classNames from '../utils/classNames';

/**
 * Custom hook để tạo class names dựa trên variant và các props khác
 * 
 * @param {Object} options - Các tùy chọn cho hook
 * @param {string} [options.variant='default'] - Variant của component
 * @param {Object} [options.styles={}] - CSS module styles object
 * @param {Object} [options.variantClasses={}] - Object mapping variant to class name
 * @param {string} [options.baseClass=''] - Base class name
 * @param {string} [options.className=''] - Additional class name
 * @param {Object} [options.conditionalClasses={}] - Object with conditional class names
 * @returns {string} Kết quả className
 */
function useClassNames({
  variant = 'default',
  styles = {},
  variantClasses = {},
  baseClass = '',
  className = '',
  conditionalClasses = {}
}) {
  return useMemo(() => {
    // Get variant specific class from styles if exists
    const variantStyle = styles[variant] || '';
    
    // Get variant specific class from variantClasses if exists
    const variantClass = variantClasses[variant] || '';
    
    // Get base class from styles if it exists and baseClass is provided
    const baseStyle = baseClass ? styles[baseClass] || baseClass : '';
    
    // Calculate conditionalClasses
    const conditionalClassNames = Object.entries(conditionalClasses)
      .filter(([_, condition]) => Boolean(condition))
      .map(([className]) => styles[className] || className)
      .join(' ');
    
    // Combine all classes
    return classNames(
      baseStyle,
      variantStyle,
      variantClass,
      conditionalClassNames,
      className
    );
  }, [variant, styles, variantClasses, baseClass, className, conditionalClasses]);
}

export default useClassNames; 
import React from 'react';
import styles from './Icon.module.css';
import classNames from '../../../utils/classNames';

/**
 * Icon component for Font Awesome icons
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Font Awesome icon name (e.g. 'fa-shopping-cart')
 * @param {string} [props.prefix='fas'] - Font Awesome prefix (fas, far, fab)
 * @param {string} [props.size='md'] - Icon size (sm, md, lg, xl)
 * @param {string} [props.color] - Icon color variant (primary, secondary, etc.)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {boolean} [props.withText=false] - Whether icon is followed by text (adds margin)
 */
function Icon({
  name,
  prefix = 'fas',
  size = 'md',
  color,
  className = '',
  withText = false,
  ...props
}) {
  // Generate Font Awesome class
  const faClass = `${prefix} ${name}`;
  
  // Generate class names based on props
  const iconClassNames = classNames(
    styles.icon,
    styles[size],
    color && styles[color],
    withText && styles.withText,
    className
  );

  return (
    <i className={classNames(faClass, iconClassNames)} {...props}></i>
  );
}

export default React.memo(Icon); 
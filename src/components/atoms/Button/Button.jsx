import React from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import styles from './Button.module.css';
import classNames from '../../../utils/classNames';

/**
 * Button component that supports both custom styling and Bootstrap styling
 * 
 * @param {Object} props
 * @param {string} [props.variant='primary'] - Button variant
 * @param {string} [props.size='md'] - Button size (sm, md, lg)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onClick] - Click handler
 * @param {string} [props.icon] - Icon class name (for Font Awesome)
 * @param {boolean} [props.isFullWidth=false] - Whether button should take full width
 * @param {boolean} [props.isQuantityButton=false] - Whether button is a quantity control button
 * @param {boolean} [props.disabled=false] - Whether button is disabled
 * @param {string} [props.type='button'] - Button type attribute
 * @param {boolean} [props.useBootstrap=false] - Whether to use Bootstrap button component
 */
function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  children,
  icon,
  isFullWidth = false,
  isQuantityButton = false,
  disabled = false,
  type = 'button',
  useBootstrap = false,
  ...props
}) {
  // Handle quantity button styling
  const actualVariant = isQuantityButton ? 'outline-secondary' : variant;
  const actualSize = isQuantityButton ? 'sm' : size;
  
  // Quantity button specific styles
  const quantityStyle = isQuantityButton ? {
    padding: '0',
    width: '24px',
    height: '24px'
  } : {};

  // Common props for both button types
  const commonProps = {
    onClick,
    disabled,
    type,
    ...props
  };

  // Common content for both button types
  const buttonContent = (
    <>
      {icon && <i className={`${icon} ${children ? 'me-2' : ''}`}></i>}
      {children}
    </>
  );

  // Use Bootstrap button
  if (useBootstrap) {
    return (
      <BootstrapButton
        variant={actualVariant}
        size={actualSize}
        className={classNames(className, isFullWidth && 'w-100')}
        style={isQuantityButton ? quantityStyle : {}}
        {...commonProps}
      >
        {buttonContent}
      </BootstrapButton>
    );
  }

  // Use custom styled button
  const buttonClassNames = classNames(
    styles.button,
    styles[actualVariant],
    styles[actualSize],
    isFullWidth && styles.fullWidth,
    isQuantityButton && styles.quantityButton,
    className
  );

  return (
    <button
      className={buttonClassNames}
      {...commonProps}
    >
      {buttonContent}
    </button>
  );
}

export default React.memo(Button); 
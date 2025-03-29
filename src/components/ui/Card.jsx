import React from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';
import classNames from '../../utils/classNames';

/**
 * Unified Card component with multiple variants
 * 
 * @param {Object} props
 * @param {string} [props.variant='default'] - Card variant ('default', 'info', 'guide')
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {string} [props.title] - Card title
 * @param {string} [props.headerClassName=''] - Header className for default variant
 * @param {string} [props.titleClassName=''] - Title className
 * @param {string} [props.headerIcon] - Header icon class for default variant
 * @param {string} [props.bodyClassName=''] - Body className
 * @param {string} [props.image] - Image URL for guide variant
 * @param {string} [props.altText] - Image alt text for guide variant
 * @param {string} [props.imageHeight='120px'] - Image height for guide variant
 */
function Card({
  variant = 'default',
  className = '',
  title,
  headerClassName = '',
  titleClassName = '',
  headerIcon,
  bodyClassName = '',
  image,
  altText,
  imageHeight = '120px',
  children,
  ...props
}) {
  // Handle variant-specific default props
  let variantClassName = '';
  let variantTitleClassName = titleClassName;
  let variantBodyClassName = bodyClassName;

  if (variant === 'info') {
    variantClassName = 'info-card border rounded';
    variantTitleClassName = titleClassName || 'text-center mb-3';
    variantBodyClassName = bodyClassName || 'p-3';
    className = className || 'h-100';
  } else if (variant === 'guide') {
    variantClassName = 'guide-card p-3 border rounded';
    className = className || 'h-100';
  }

  const cardClassName = classNames(variantClassName, className);

  if (variant === 'guide') {
    return (
      <BootstrapCard className={cardClassName} {...props}>
        <img 
          src={image} 
          alt={altText || title} 
          className="w-100 mb-2" 
          style={{height: imageHeight, objectFit: 'cover'}} 
        />
        <h5 className="guide-title">{title}</h5>
      </BootstrapCard>
    );
  }

  if (variant === 'info') {
    return (
      <BootstrapCard className={cardClassName} {...props}>
        <BootstrapCard.Body className={variantBodyClassName}>
          {title && <h4 className={variantTitleClassName}>{title}</h4>}
          {children}
        </BootstrapCard.Body>
      </BootstrapCard>
    );
  }

  // Default card variant
  return (
    <BootstrapCard className={cardClassName} {...props}>
      {title && (
        <BootstrapCard.Header className={headerClassName}>
          {headerIcon && <i className={classNames(headerIcon, 'me-2')}></i>}
          <span className={titleClassName}>{title}</span>
        </BootstrapCard.Header>
      )}
      <BootstrapCard.Body className={bodyClassName}>
        {children}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
}

export default React.memo(Card);

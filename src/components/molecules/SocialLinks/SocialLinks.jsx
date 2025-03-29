import React from 'react';
import styles from './SocialLinks.module.css';
import { SOCIAL_LINKS } from '../../../constants';
import Icon from '../../atoms/Icon';

/**
 * SocialLinks component for showing social media icons with links
 * 
 * @param {Object} props - Component props
 * @param {Array} [props.links] - Array of social links objects (defaults to SOCIAL_LINKS)
 * @param {string} [props.variant='default'] - Variant style (default, header, footer, widget)
 * @param {string} [props.className=''] - Additional CSS classes
 */
function SocialLinks({
  links = SOCIAL_LINKS,
  variant = 'default',
  className = '',
  ...props
}) {
  // Map variant to style class
  const variantClass = variant !== 'default' ? styles[`${variant}Style`] : '';
  
  // Generate class names
  const containerClass = [
    styles.container,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClass} {...props}>
      {links.map(link => (
        <a 
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.link} ${link.className || ''}`}
          aria-label={link.label}
        >
          <Icon
            name={link.icon}
            prefix={link.prefix || 'fab'}
            size={variant === 'footer' ? 'xl' : 'lg'}
          />
        </a>
      ))}
    </div>
  );
}

export default React.memo(SocialLinks); 
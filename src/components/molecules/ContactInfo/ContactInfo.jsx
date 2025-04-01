import React from 'react';
import styles from './ContactInfo.module.css';
import { CONTACT_INFO } from '../../../constants';
import Icon from '../../atoms/Icon';

/**
 * ContactInfo component for displaying business contact information
 * 
 * @param {Object} props - Component props
 * @param {Object} [props.contactInfo] - Contact information object (defaults to CONTACT_INFO)
 * @param {boolean} [props.showMap=false] - Whether to show the map embed
 * @param {boolean} [props.showFullAddress=true] - Whether to show the full address or short version
 * @param {string} [props.variant='default'] - Variant style (default, header, footer, widget)
 * @param {string} [props.className=''] - Additional CSS classes
 */
function ContactInfo({
  contactInfo = CONTACT_INFO,
  showMap = false,
  showFullAddress = true,
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

  // Get appropriate address format
  const address = showFullAddress ? contactInfo.address.full : contactInfo.address.short;

  return (
    <div className={containerClass} {...props}>
      {/* Address */}
      <div className={styles.item}>
        <div className={styles.itemIcon}>
          <Icon name="map-marker-alt" prefix="fas" color={variant === 'footer' ? 'light' : 'primary'} />
        </div>
        <div className={styles.itemContent}>
          {variant !== 'header' && <div className={styles.heading}>Address</div>}
          <div className={styles.text}>{address}</div>
        </div>
      </div>

      {/* Phone */}
      <div className={styles.item}>
        <div className={styles.itemIcon}>
          <Icon name="phone-alt" prefix="fas" color={variant === 'footer' ? 'light' : 'primary'} />
        </div>
        <div className={styles.itemContent}>
          {variant !== 'header' && <div className={styles.heading}>Phone</div>}
          <a href={`tel:${contactInfo.phone}`} className={styles.link}>
            {contactInfo.phone}
          </a>
        </div>
      </div>

      {/* Email */}
      <div className={styles.item}>
        <div className={styles.itemIcon}>
          <Icon name="envelope" prefix="fas" color={variant === 'footer' ? 'light' : 'primary'} />
        </div>
        <div className={styles.itemContent}>
          {variant !== 'header' && <div className={styles.heading}>Email</div>}
          <a href={`mailto:${contactInfo.email}`} className={styles.link}>
            {contactInfo.email}
          </a>
        </div>
      </div>

      {/* Website */}
      {variant !== 'header' && (
        <div className={styles.item}>
          <div className={styles.itemIcon}>
            <Icon name="globe" prefix="fas" color={variant === 'footer' ? 'light' : 'primary'} />
          </div>
          <div className={styles.itemContent}>
            <div className={styles.heading}>Website</div>
            <a href={contactInfo.website} className={styles.link} target="_blank" rel="noopener noreferrer">
              {contactInfo.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        </div>
      )}

      {/* Map Embed if enabled */}
      {showMap && contactInfo.mapEmbedUrl && (
        <div className={styles.mapContainer}>
          <iframe
            src={contactInfo.mapEmbedUrl}
            className={styles.mapEmbed}
            title="Location Map"
            loading="lazy"
            allowFullScreen={true}
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default React.memo(ContactInfo);
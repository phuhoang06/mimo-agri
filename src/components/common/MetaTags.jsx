import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

/**
 * Component to manage meta tags for better social media sharing
 */
const MetaTags = ({ 
  title, 
  description, 
  image, 
  url,
  type = 'website'
}) => {
  // Update document title
  useEffect(() => {
    if (title) {
      document.title = title;
    }
  }, [title]);

  return (
    <Helmet>
      {/* Standard meta tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      {url && <meta property="og:url" content={url} />}
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      {image && <meta name="twitter:image" content={image} />}
    </Helmet>
  );
};

export default MetaTags; 
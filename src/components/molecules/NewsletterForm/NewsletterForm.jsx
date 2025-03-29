import React, { useState } from 'react';
import styles from './NewsletterForm.module.css';
import Button from '../../atoms/Button';

/**
 * NewsletterForm component for subscription forms
 * 
 * @param {Object} props - Component props
 * @param {string} [props.title='Subscribe to Our Newsletter'] - Form title
 * @param {string} [props.description='Stay updated with our latest news and offers.'] - Form description
 * @param {string} [props.buttonText='Subscribe'] - Button text
 * @param {string} [props.placeholder='Your email address'] - Input placeholder
 * @param {boolean} [props.showConsent=true] - Whether to show consent checkbox
 * @param {string} [props.consentText='I agree to receive marketing emails'] - Consent text
 * @param {string} [props.variant='default'] - Variant style (default, footer, inline)
 * @param {string} [props.className=''] - Additional CSS classes
 * @param {Function} [props.onSubmit] - Custom submit handler
 */
function NewsletterForm({
  title = 'Subscribe to Our Newsletter',
  description = 'Stay updated with our latest news and offers.',
  buttonText = 'Subscribe',
  placeholder = 'Your email address',
  showConsent = true,
  consentText = 'I agree to receive marketing emails',
  variant = 'default',
  className = '',
  onSubmit,
  ...props
}) {
  // Form state
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Map variant to style class
  const variantClass = variant !== 'default' ? styles[`${variant}Style`] : '';
  
  // Generate class names
  const containerClass = [
    styles.container,
    variantClass,
    className
  ].filter(Boolean).join(' ');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    if (showConsent && !consent) {
      setError('Please agree to our marketing emails');
      return;
    }
    
    // Custom submit handler or default behavior
    if (onSubmit) {
      onSubmit({ email, consent });
    } else {
      // Simulate success after submission
      setSuccess(true);
      setEmail('');
      setConsent(false);
    }
  };

  return (
    <div className={containerClass} {...props}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      
      {success ? (
        <div className={styles.success}>
          Thank you for subscribing! Please check your email to confirm your subscription.
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <input
              type="email"
              className={styles.input}
              placeholder={placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            {variant === 'inline' && (
              <Button
                type="submit"
                variant="primary"
                size={variant === 'footer' ? 'sm' : 'md'}
              >
                {buttonText}
              </Button>
            )}
          </div>
          
          {showConsent && (
            <div className={styles.formGroup}>
              <input
                type="checkbox"
                id="consent"
                className={styles.checkbox}
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
              />
              <label htmlFor="consent">{consentText}</label>
            </div>
          )}
          
          {error && <div className={styles.error}>{error}</div>}
          
          {variant !== 'inline' && (
            <Button
              type="submit"
              variant="primary"
              size={variant === 'footer' ? 'sm' : 'md'}
              fullWidth
            >
              {buttonText}
            </Button>
          )}
        </form>
      )}
    </div>
  );
}

export default React.memo(NewsletterForm); 
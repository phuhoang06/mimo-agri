import React, { useState, useEffect } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../../utils/CartManager';

function MobileHeader({ onMenuClick }) {
  const { cart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const cartItemCount = cart.length;

  // Kiểm tra scroll để hiển thị header sticky
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`mobile-header d-md-none ${isScrolled ? 'sticky-active' : ''}`}>
      <div className="d-flex justify-content-between align-items-center p-2">
        <Button 
          variant="outline-secondary" 
          className="btn-icon" 
          onClick={onMenuClick}
          aria-label="Menu"
        >
          <i className="fa fa-bars"></i>
        </Button>

        <Link to="/" className="mobile-logo">
          <img 
            src={require('../../assets/logo.svg').default} 
            alt="MIMO Agriculture" 
            style={{ height: '30px' }} 
          />
        </Link>
        
        <div className="mobile-actions">
          <Link to="/san-pham" className="btn-icon me-2">
            <i className="fa fa-search"></i>
          </Link>
          
          <button 
            className="btn-icon position-relative" 
            data-bs-toggle="modal" 
            data-bs-target="#cartModal"
          >
            <i className="fa fa-shopping-cart"></i>
            {cartItemCount > 0 && (
              <Badge 
                bg="danger" 
                pill 
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cartItemCount}
              </Badge>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileHeader; 
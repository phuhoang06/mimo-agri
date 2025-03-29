import React, { useState, useEffect } from 'react';
import tiktokIcon from '../../assets/icon/tiktok.png';
import facebookIcon from '../../assets/icon/facebook.png';
import zaloIcon from '../../assets/icon/zalo.png';
import supportIcon from '../../assets/icon/support-icon.png';
import { useCart } from '../../utils/CartManager';
import { Button } from 'react-bootstrap';

function ChatWidget() {
  const { showCart, cart, isCartEnabled } = useCart();
  const [isExpanded, setIsExpanded] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);

  // Set initial position to bottom left corner
  useEffect(() => {
    const setInitialPosition = () => {
      const windowHeight = window.innerHeight;
      const widgetHeight = 400; // Approximate height of expanded widget
      
      const initialX = 20; // 20px from left edge
      const initialY = windowHeight - widgetHeight - 20; // 20px from bottom
      
      setPosition({ x: initialX, y: initialY });
      setOriginalPosition({ x: initialX, y: initialY });
    };

    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);
    return () => window.removeEventListener('resize', setInitialPosition);
  }, []);

  const toggleExpand = () => {
    if (isDragging || hasMoved) return; // Prevent toggling if dragging or has moved
    if (isExpanded) {
      // When collapsing, save current position
      setOriginalPosition(position);
    } else {
      // When expanding, reset to original position
      setPosition(originalPosition);
    }
    setIsExpanded(!isExpanded);
  };

  const handleMouseDown = (e) => {
    if (!isExpanded) {
      setHasMoved(false);
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && !isExpanded) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      
      // Check if widget has moved from original position
      if (!hasMoved) {
        const moveDistance = Math.sqrt(
          Math.pow(newX - position.x, 2) +
          Math.pow(newY - position.y, 2)
        );
        if (moveDistance > 5) { // If moved more than 5 pixels
          setHasMoved(true);
        }
      }

      // Prevent dragging outside window bounds
      const maxX = window.innerWidth - 100;
      const maxY = window.innerHeight - 100;
      
      setPosition({
        x: Math.min(Math.max(0, newX), maxX),
        y: Math.min(Math.max(0, newY), maxY)
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Only toggle if widget hasn't been moved
      if (!hasMoved) {
        toggleExpand();
      }
    }
  };

  useEffect(() => {
    if (!isExpanded) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isExpanded, isDragging, position, dragStart, hasMoved]);

  return (
    <div 
      id="chat-widget" 
      className={isExpanded ? "expanded" : "collapsed"}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        cursor: isExpanded ? 'default' : 'move',
        zIndex: 1000
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="toggle-btn-container">
        <button onClick={toggleExpand} className="toggle-btn rounded-circle">
          <i className={`fas ${isExpanded ? 'fa-times' : 'fa-comment'}`}></i>
        </button>
      </div>
      
      <div className="widget-items d-flex flex-column">
        {isCartEnabled && (
          <Button id="cart-btn" onClick={showCart}>
            <i className="fas fa-shopping-cart me-2"></i>Giỏ hàng
          </Button>
        )}
        
        <Button id="tiktok-btn" onClick={() => window.open('https://www.tiktok.com/@mimo.agriculture', '_blank')}>
          <i className="fab fa-tiktok me-2"></i>Tiktok Shop
        </Button>
        
        <Button id="facebook-btn" onClick={() => window.open('https://www.facebook.com/www.mimo.agri', '_blank')}>
          <i className="fab fa-facebook-f me-2"></i>Facebook
        </Button>
        
        <Button id="chat-btn"   onClick={() => window.open('https://zalo.me/0853991995', '_blank')}>
          <i className="far fa-comment-dots me-2"></i>Chat Zalo
        </Button>
        
        <Button id="hotline-btn" onClick={() => window.open('tel:0853991995', '_blank')}>
          <i className="fas fa-phone-alt me-2"></i>Hotline
        </Button>
      </div>
    </div>
  );
}

export default ChatWidget; 
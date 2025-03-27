import React, { useState, useEffect } from 'react';
import tiktokIcon from '../../assets/icon/tiktok.png';
import facebookIcon from '../../assets/icon/facebook.png';
import zaloIcon from '../../assets/icon/zalo.png';
import supportIcon from '../../assets/icon/support-icon.png';
import { useCart } from '../../utils/CartManager';

function ChatWidget() {
  const { showCart, cart } = useCart();
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
          {isExpanded ? (
            <i className="fas fa-times"></i>
          ) : (
            <i className="fas fa-comment-dots"></i>
          )}
        </button>
      </div>
      
      <div className="widget-items">
        <div>
          <button id="cart-btn" className="btn btn-success rounded-pill px-3 py-2 d-flex align-items-center shadow" onClick={showCart}>
            <i className="fa fa-shopping-cart rounded-circle me-1" style={{ height: '25px', width: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#198754', border: '2px solid #fff', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }}></i>
            <span className="d-none d-sm-inline">Giỏ hàng</span>
            {cart.length > 0 && <span className="badge bg-danger rounded-pill ms-2">{cart.length}</span>}
          </button>
        </div>
        <div>
          <button id="tiktok-btn" className="btn btn-dark rounded-pill px-3 py-2 d-flex align-items-center shadow">
            <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'white' }}>
              <img src={tiktokIcon} alt="TikTok" className="rounded-circle me-1" style={{ height: '25px', width: '25px', border: '2px solid #fff', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }} />
              <span className="d-none d-sm-inline">TikTok</span>
            </a>
          </button>
        </div>
        <div>
          <button id="facebook-btn" className="btn rounded-pill px-3 py-2 d-flex align-items-center shadow">
            <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'white' }}>
              <img src={facebookIcon} alt="Facebook" className="rounded-circle me-1" style={{ height: '25px', width: '25px', border: '2px solid #fff', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }} />
              <span className="d-none d-sm-inline">Facebook</span>
            </a>
          </button>
        </div>
        <div>
          <button id="chat-btn" className="btn rounded-pill px-3 py-2 d-flex align-items-center shadow">
            <a href="https://zalo.me/0853991995" target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: '#0078ff' }}>
              <img src={zaloIcon} alt="Zalo" className="rounded-circle me-1" style={{ height: '25px', width: '25px', border: '2px solid #fff', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }} />
              <span className="d-none d-sm-inline">Chat Zalo</span>
            </a>
          </button>
        </div>
        <div>
          <button id="hotline-btn" className="btn rounded-pill px-3 py-2 d-flex align-items-center shadow">
            <a href="tel:+8485 399 1995" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'white' }}>
              <img src={supportIcon} alt="Hotline" className="rounded-circle me-1" style={{ height: '25px', width: '25px', border: '2px solid #fff', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }} />
              <span className="d-none d-sm-inline">085 399 1995</span>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWidget; 
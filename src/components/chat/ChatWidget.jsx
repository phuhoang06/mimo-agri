import React, { useState, useEffect } from 'react';
import facebookIcon from '../../assets/icon/facebook.png';
import zaloIcon from '../../assets/icon/zalo.png';
import supportIcon from '../../assets/icon/support-icon.png';
import { useCart } from '../../utils/CartManager';
import { Button } from '../ui';

// Biến toàn cục đơn giản để lưu trữ trạng thái
if (typeof window !== 'undefined') {
  window.chatWidgetState = window.chatWidgetState || {
    isExpanded: true,
    position: null,
    originalPosition: null,
    hasMoved: false
  };
}

function ChatWidget() {
  const { showCart, cart, isCartEnabled } = useCart();
  // Khởi tạo state từ biến toàn cục nếu đã có, nếu không thì dùng giá trị mặc định
  const [isExpanded, setIsExpanded] = useState(() => window.chatWidgetState?.isExpanded ?? true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(() => window.chatWidgetState?.hasMoved ?? false);

  // Set initial position to bottom left corner
  useEffect(() => {
    const setInitialPosition = () => {
      const windowHeight = window.innerHeight;
      const widgetHeight = 400; // Approximate height of expanded widget
      
      const initialX = 20; // 20px from left edge
      const initialY = windowHeight - widgetHeight - 20; // 20px from bottom
      
      // Nếu đã có vị trí được lưu và đã di chuyển, sử dụng lại
      if (window.chatWidgetState?.position && window.chatWidgetState.hasMoved) {
        setPosition(window.chatWidgetState.position);
        setOriginalPosition(window.chatWidgetState.originalPosition || { x: initialX, y: initialY });
      } else {
        setPosition({ x: initialX, y: initialY });
        setOriginalPosition({ x: initialX, y: initialY });
      }
    };

    setInitialPosition();
    window.addEventListener('resize', setInitialPosition);
    return () => window.removeEventListener('resize', setInitialPosition);
  }, []);

  // Lưu trạng thái vào biến toàn cục khi thay đổi
  useEffect(() => {
    window.chatWidgetState = {
      isExpanded,
      position,
      originalPosition,
      hasMoved
    };
  }, [isExpanded, position, originalPosition, hasMoved]);

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
          <Button 
            variant="cart"
            onClick={showCart}
            icon="fas fa-shopping-cart"
          >
            Giỏ hàng
          </Button>
        )}
        
        <Button 
          variant="facebook"
          onClick={() => window.open('https://www.facebook.com/www.mimo.agri', '_blank')}
          icon="fab fa-facebook-f"
        >
          Facebook
        </Button>
        
        <Button 
          variant="zalo"
          onClick={() => window.open('https://zalo.me/0853991995', '_blank')}
          icon="far fa-comment-dots"
        >
          Chat Zalo
        </Button>
        
        <Button 
          variant="hotline"
          onClick={() => window.open('tel:0853991995', '_blank')}
          icon="fas fa-phone-alt"
        >
          Hotline
        </Button>
      </div>
    </div>
  );
}

export default ChatWidget; 
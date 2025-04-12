import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ShareModal from './ShareModal';

const SocialShare = ({ onFacebookShare, onMessengerShare, onZaloShare }) => {
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Get the current product URL and title from window
  const productUrl = window.location.href;
  const productTitle = document.title;
  
  // Handle share button click
  const handleShareClick = (e) => {
    e.preventDefault();
    setShowShareModal(true);
  };
  
  return (
    <>
      <div className="product-share">
        <Button 
          variant="outline-secondary" 
          className="d-flex align-items-center" 
          onClick={handleShareClick}
        >
          <i className="fas fa-share-alt me-2"></i>
          Chia sẻ
        </Button>
      </div>
      
      <ShareModal 
        show={showShareModal}
        onHide={() => setShowShareModal(false)}
        productTitle={productTitle}
        productUrl={productUrl}
      />
    </>
  );
};

export default SocialShare; 
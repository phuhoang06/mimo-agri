import React from 'react';

const SocialShare = ({ handleFacebookShare, handleMessengerShare, handleZaloShare }) => {
  return (
    <div className="product-share">
      <span className="me-2">Chia sẻ:</span>
      <a href="#" onClick={(e) => { e.preventDefault(); handleFacebookShare(); }} className="social-icon me-2">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); handleMessengerShare(); }} className="social-icon me-2">
        <i className="fab fa-facebook-messenger"></i>
      </a>
      <a href="#" onClick={(e) => { e.preventDefault(); handleZaloShare(); }} className="social-icon">
        <i className="fas fa-comment-alt"></i>
      </a>
    </div>
  );
};

export default SocialShare; 
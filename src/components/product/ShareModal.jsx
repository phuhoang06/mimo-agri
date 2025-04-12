import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';

const ShareModal = ({ 
  show, 
  onHide, 
  productTitle, 
  productUrl,
  facebookAppId = '936619743392459' 
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [customMessage, setCustomMessage] = useState(`Xem sản phẩm "${productTitle}" này`);
  const [fbInitialized, setFbInitialized] = useState(false);

  // Khởi tạo Facebook SDK khi component được mount
  useEffect(() => {
    // Chỉ tải Facebook SDK nếu nó chưa được tải
    if (!window.FB) {
      // Load Facebook SDK
      const script = document.createElement('script');
      script.src = `https://connect.facebook.net/vi_VN/sdk.js`;
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = initFacebook;
      document.body.appendChild(script);
    } else if (window.FB) {
      setFbInitialized(true);
    }
  }, []);

  // Khởi tạo Facebook SDK
  const initFacebook = () => {
    window.FB.init({
      appId: facebookAppId,
      version: 'v17.0',
      xfbml: true
    });
    setFbInitialized(true);
  };

  // Function to copy link to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(productUrl).then(() => {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    });
  };

  // Share on Facebook using Facebook API
  const shareOnFacebook = () => {
    if (fbInitialized && window.FB) {
      window.FB.ui({
        method: 'share',
        href: productUrl,
        quote: customMessage
      });
    } else {
      // Fallback nếu FB SDK chưa tải xong
      const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}&quote=${encodeURIComponent(customMessage)}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  // Share on Messenger
  const shareOnMessenger = () => {
    if (fbInitialized && window.FB) {
      window.FB.ui({
        method: 'send',
        link: productUrl
      });
    } else {
      const shareUrl = `https://www.facebook.com/dialog/send?app_id=${facebookAppId}&link=${encodeURIComponent(productUrl)}&redirect_uri=${encodeURIComponent(window.location.origin)}`;
      window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
    }
  };

  // Share on Zalo
  const shareOnZalo = () => {
    const shareUrl = `https://zalo.me/share/article?url=${encodeURIComponent(productUrl)}&title=${encodeURIComponent(customMessage)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  // Share on Twitter
  const shareOnTwitter = () => {
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(customMessage)}&url=${encodeURIComponent(productUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  // Share on WhatsApp
  const shareOnWhatsApp = () => {
    const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(customMessage + ' ' + productUrl)}`;
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  // Share via Email
  const shareViaEmail = () => {
    const shareUrl = `mailto:?subject=${encodeURIComponent(customMessage)}&body=${encodeURIComponent(customMessage + '\n\n' + productUrl)}`;
    window.location.href = shareUrl;
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Chia sẻ sản phẩm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Tin nhắn tùy chỉnh */}
        <div className="mb-3">
          <Form.Label>Tin nhắn chia sẻ:</Form.Label>
          <Form.Control 
            as="textarea" 
            rows={2} 
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            placeholder="Nhập tin nhắn của bạn..."
          />
        </div>
        
        {/* URL sản phẩm */}
        <div className="mb-3">
          <Form.Label>Liên kết sản phẩm:</Form.Label>
          <InputGroup>
            <Form.Control 
              type="text" 
              value={productUrl} 
              readOnly 
            />
            <Button 
              variant={copiedLink ? "success" : "primary"} 
              onClick={copyToClipboard}
            >
              {copiedLink ? "Đã sao chép" : "Sao chép"}
            </Button>
          </InputGroup>
        </div>
        
        <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
          <Button onClick={shareOnFacebook} variant="outline-primary" className="share-btn">
            <i className="fab fa-facebook-f me-2"></i>Facebook
          </Button>
          
          <Button onClick={shareOnMessenger} variant="outline-info" className="share-btn">
            <i className="fab fa-facebook-messenger me-2"></i>Messenger
          </Button>
          
          <Button onClick={shareOnZalo} variant="outline-info" className="share-btn">
            <i className="fas fa-comment-alt me-2"></i>Zalo
          </Button>
          
          <Button onClick={shareOnTwitter} variant="outline-info" className="share-btn">
            <i className="fab fa-twitter me-2"></i>Twitter
          </Button>
          
          <Button onClick={shareOnWhatsApp} variant="outline-success" className="share-btn">
            <i className="fab fa-whatsapp me-2"></i>WhatsApp
          </Button>
          
          <Button onClick={shareViaEmail} variant="outline-secondary" className="share-btn">
            <i className="fas fa-envelope me-2"></i>Email
          </Button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-muted">Nhúng sản phẩm này</p>
          <Form.Control 
            as="textarea" 
            rows={2} 
            readOnly 
            value={`<iframe width="560" height="315" src="${productUrl}" frameborder="0" allowfullscreen></iframe>`}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ShareModal; 
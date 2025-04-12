import React from 'react';
import { Container } from 'react-bootstrap';

function TopBar() {
  return (
    <div className="top-bar">
      <Container className="d-flex justify-content-between align-items-center flex-wrap py-2">
        <div className="d-flex align-items-center flex-wrap">
          <span className="me-3 mb-1">
            <i className="fas fa-map-marker-alt icon-color me-1"></i>
            <span className="d-none d-md-inline">Chiến Thắng, Văn Quán, Hà Đông, Hà Nội, Việt Nam</span>
            <span className="d-inline d-md-none">Hà Đông, Hà Nội</span>
          </span>
          <span className="me-3 mb-1">
            <i className="fas fa-phone icon-color me-1"></i> 085 399 1995
          </span>
          <span className="me-3 mb-1">
            <i className="fas fa-envelope icon-color me-1"></i> mimoagriculture@gmail.com 
          </span>
          <span className="mb-1">
            <i className="fas fa-globe icon-color me-1"></i> bayruoivang.com
          </span>
        </div>
        <div className="social-icons mt-1">
          <a href="https://www.facebook.com/www.mimo.agri" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook mx-1"></i></a>
          <a href="https://www.tiktok.com/@mimo.agriculture" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok mx-1"></i></a>
          <a href="https://www.youtube.com/@MiMoAgriculture" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube mx-1"></i></a>
        </div>
      </Container>
    </div>
  );
}

export default TopBar; 
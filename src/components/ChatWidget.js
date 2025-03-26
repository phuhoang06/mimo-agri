import React from 'react';
import tiktokIcon from '../assets/icon/tiktok.png';
import facebookIcon from '../assets/icon/facebook.png';
import zaloIcon from '../assets/icon/zalo.png';
import supportIcon from '../assets/icon/support-icon.png';
import pinterestIcon from '../assets/icon/pinterest.png';

function ChatWidget() {
  return (
    <div id="chat-widget">
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
        <button id="pinterest-btn" className="btn btn-danger rounded-pill px-3 py-2 d-flex align-items-center shadow">
          <a href="#" target="_blank" rel="noopener" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', color: 'white' }}>
            <img src={pinterestIcon} alt="Pinterest" className="rounded-circle me-1" style={{ height: '25px', width: '25px', border: '2px solid #fff', boxShadow: '0 0 5px rgba(0,0,0,0.3)' }} />
            <span className="d-none d-sm-inline">Pinterest</span>
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
  );
}

export default ChatWidget;
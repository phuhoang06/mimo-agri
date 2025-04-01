import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function VideoCard({ video, featured = false }) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(true);
  
  return (
    <div className="video-item h-100">
      <div className={`youtube-embed-container ${featured ? 'featured-embed' : ''}`}>
        {isVideoLoaded ? (
          <div className="ratio ratio-16x9">
            <iframe 
              src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&iv_load_policy=3&hl=vi&origin=${window.location.origin}`}
              title="YouTube video"
              frameBorder="0"
              loading="eager"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div 
            className="youtube-thumbnail"
            onClick={() => setIsVideoLoaded(true)}
          >
            <img
              src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
              alt="YouTube video thumbnail"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`;
              }}
            />
            <div className="youtube-branding">
              <div className="youtube-logo">
                <svg height="100%" version="1.1" viewBox="0 0 68 14" width="100%">
                  <path className="ytp-svg-fill" d="M63,14h-4V6h-2v-2h8v2h-2V14z M41,10c0-0.5,0-3.8,0-3.8h-2V10c0,0.6-0.1,0.4-0.6,0.4c-0.5,0-0.6-0.9-0.6-0.9V6h-2c0,0,0,3.3,0,4c0,0.7,0.4,2,2,2C39.1,12,41,12,41,10z M34,7.4c0-0.6,0.4-0.8,0.8-0.8c0.5,0,1.1,0.5,1.3,0.7l0.8-1.3C36.5,5.5,35.5,5,34.5,5c-1.5,0-3,0.7-3,2.5v3c0,1.8,1.5,2.5,3,2.5c1,0,2-0.5,2.4-1L36,10.7c-0.2,0.3-0.8,0.7-1.3,0.7c-0.4,0-0.8-0.3-0.8-0.8V7.4z M26,8.8V10c0,0.5,0.4,0.9,0.9,0.9c0.6,0,1.6-0.8,2.1-1.2V6h2v8h-2v-0.7c-1,0.8-1.6,0.9-2.5,0.9c-1.6,0-2.5-1.3-2.5-2.4V6h2C26,6,26,8.8,26,8.8z M20,11c-0.4,0-0.8-0.4-0.8-1V8c0-0.6,0.4-1,0.8-1c0.5,0,0.8,0.4,0.8,1v2C20.8,10.5,20.5,11,20,11z M22.8,5.5c-0.7-0.4-1.5-0.5-2.8-0.5c-1.3,0-2.1,0.1-2.8,0.5C16.3,6,16,7,16,7.8v0.5C16,9,16.3,10,17.2,10.6c0.7,0.4,1.5,0.5,2.8,0.5c1.3,0,2.1-0.1,2.8-0.5c0.9-0.5,1.2-1.6,1.2-2.3V7.8C24,7,23.7,6,22.8,5.5z M68,6.9c0-1.3-0.8-2.2-2.2-2.2c-1.1,0-2.1,0.3-3.3,1.3l-0.7,0.5l-0.7-0.4C59.9,5.2,58.8,4.8,57.3,4.8c-0.4,0-1,0-1.5,0.1c0,0-1.6,0.2-2.8,1.3L53,6.2l-0.2-1.1h-4v9h3.8v-6C53,7.9,53.3,7,54.5,7c1.1,0,1.5,0.8,1.5,1.8v5.2h3.8V8.9c0.3-0.1,0.6-0.2,1-0.2c1.1,0,1.5,0.8,1.5,1.8v5.5H66V8.3c0.2-0.1,0.4-0.1,0.6-0.1c0.5,0,0.8,0.2,0.8,0.8v5h3.8V8.3C71.2,8.3,68,8.3,68,6.9z M24,5h2v8h-2V5z M12,4.8c-1.3,0-2.4,0.2-3.1,0.7c-1.1,0.7-1.1,1.6-1.1,2.5H8v1H7.9v1H8c0,0.9,0,1.8,1.1,2.5c0.7,0.5,1.8,0.7,3.1,0.7c1.3,0,2.4-0.2,3.1-0.7c1.1-0.7,1.1-1.6,1.1-2.5h0.1v-1h-0.1v-1H16c0-0.9,0-1.8-1.1-2.5C14.4,5,13.3,4.8,12,4.8z M3.5,11.3l-1.7-6H0v8h2v-6l1.7,6H6V6H3.5V11.3z M0,5h6v1H0V5z" fill="#fff"></path>
                </svg>
              </div>
            </div>
            <div className="youtube-play-button">
              <svg height="100%" version="1.1" viewBox="0 0 68 48" width="100%">
                <path d="M66.52,7.74c-0.78-2.93-2.49-5.41-5.42-6.19C55.79,.13,34,0,34,0S12.21,.13,6.9,1.55 C3.97,2.33,2.27,4.81,1.48,7.74C0.06,13.05,0,24,0,24s0.06,10.95,1.48,16.26c0.78,2.93,2.49,5.41,5.42,6.19 C12.21,47.87,34,48,34,48s21.79-0.13,27.1-1.55c2.93-0.78,4.64-3.26,5.42-6.19C67.94,34.95,68,24,68,24S67.94,13.05,66.52,7.74z" fill="#f00"></path>
                <path d="M 45,24 27,14 27,34" fill="#fff"></path>
              </svg>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCard; 
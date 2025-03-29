import React, { useState } from 'react';
import { Card } from 'react-bootstrap';

function VideoCard({ video }) {
  const [showVideo, setShowVideo] = useState(false);
  
  const handleThumbnailClick = () => {
    setShowVideo(true);
  };
  
  return (
    <Card className="video-card youtube-style">
      {!showVideo ? (
        <div className="video-thumbnail-container">
          <Card.Img 
            variant="top" 
            src={video.thumbnail} 
            alt={video.title}
            className="video-thumbnail" 
            onClick={handleThumbnailClick}
          />
          <div className="play-button-overlay" onClick={handleThumbnailClick}>
            <i className="fas fa-play-circle"></i>
          </div>
        </div>
      ) : (
        <div className="ratio ratio-16x9">
          <iframe 
            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`} 
            title={video.title} 
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      )}
      <Card.Body className="p-2">
        <Card.Title className="video-title mb-0">{video.title}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default VideoCard; 
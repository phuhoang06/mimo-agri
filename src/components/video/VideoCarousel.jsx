import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VideoCard from './VideoCard';
import { getVideos } from '../../data/videos';

function VideoCarousel({ limit = 5 }) {
  // Get videos from data source with maximum of 5
  const displayVideos = getVideos(limit);
  
  return (
    <div className="video-carousel-container">
      <Row className="g-3">
        {displayVideos.map((video) => (
          <Col key={video.id} xs={12} sm={6} md={4} lg={limit <= 4 ? 3 : undefined}>
            <VideoCard video={video} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default VideoCarousel; 
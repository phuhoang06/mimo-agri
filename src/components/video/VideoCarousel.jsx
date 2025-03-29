import React from 'react';
import { Row, Col } from 'react-bootstrap';
import VideoCard from './VideoCard';
import { getVideos } from '../../data/videos';

function VideoCarousel({ limit = 5 }) {
  // Get videos from data source with maximum of 5
  const displayVideos = getVideos(limit);
  
  return (
    <Row className="g-2 five-cards-row">
      {displayVideos.map((video) => (
        <Col key={video.id} xs={12} sm={6} md={4} lg={limit === 5 ? true : 3}>
          <VideoCard video={video} />
        </Col>
      ))}
    </Row>
  );
}

export default VideoCarousel; 
import React from 'react';
import { Carousel } from 'react-bootstrap';

function VideoCarousel() {
  return (
    <Carousel id="videoCarousel" interval={5000} controls={true} indicators={true}>
      <Carousel.Item>
        <div className="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/osD0RAxQsbE" title="YouTube video" allowFullScreen></iframe>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/OHqcNAyqV2A" title="YouTube video" allowFullScreen></iframe>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default VideoCarousel; 
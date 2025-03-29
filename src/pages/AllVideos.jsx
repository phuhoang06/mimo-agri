import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import VideoCard from '../components/video/VideoCard';
import { videos } from '../data/videos';

function AllVideos() {
  return (
    <>
      <Header />
      
      <Container className="py-3">
        <Section id="all-videos" title="TẤT CẢ CÁC VIDEO">
          <div className="youtube-list">
            {videos.map(video => (
              <div key={video.id} className="youtube-list-item">
                <Row>
                  <Col xs={12} sm={4} md={3}>
                    <div className="video-thumbnail-container">
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="video-thumbnail" 
                        onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}
                      />
                      <div className="play-button-overlay" onClick={() => window.open(`https://www.youtube.com/watch?v=${video.videoId}`, '_blank')}>
                        <i className="fas fa-play-circle"></i>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={9}>
                    <div className="video-info">
                      <h5 className="video-title">{video.title}</h5>
                      <p className="video-description">{video.description}</p>
                    </div>
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </Section>
      </Container>
      
      <Footer />
    </>
  );
}

export default AllVideos; 
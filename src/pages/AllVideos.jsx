import React, { useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import VideoCard from '../components/video/VideoCard';
import { videos } from '../data/videos';

function AllVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <Header />
      
      <Container className="py-4">
        <Section id="all-videos" title="VIDEO">
          <div className="video-carousel-container">
            <Row className="g-3">
              {videos.map((video) => (
                <Col key={video.id} xs={12} sm={6} md={4} lg={3}>
                  <div onClick={() => handleVideoClick(video)}>
                    <VideoCard video={video} />
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Section>
      </Container>
      
      {/* Video Modal */}
      <Modal 
        show={selectedVideo !== null} 
        onHide={handleCloseModal} 
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>YouTube Video</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <div className="ratio ratio-16x9">
              <iframe 
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&autoplay=1`}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          )}
        </Modal.Body>
      </Modal>
      
      <Footer />
    </>
  );
}

export default AllVideos; 
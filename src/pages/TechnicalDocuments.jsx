import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import { technicalDocs } from '../data/technicalDocs';

function TechnicalDocuments() {
  return (
    <>
      <Header />
      
      <Container className="py-3">
        <Section id="technical-documents" title="TÀI LIỆU KỸ THUẬT">
          <div className="youtube-list">
            {technicalDocs.map(doc => (
              <div key={doc.id} className="youtube-list-item">
                <Row>
                  <Col xs={12} sm={4} md={3}>
                    <div className="tech-doc-thumbnail-container">
                      <img 
                        src={doc.image} 
                        alt={doc.title}
                        className="tech-doc-thumbnail" 
                      />
                    </div>
                  </Col>
                  <Col xs={12} sm={8} md={9}>
                    <div className="tech-doc-info">
                      <h5 className="tech-doc-title">{doc.title}</h5>
                      <p className="tech-doc-description">{doc.description}</p>
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

export default TechnicalDocuments;
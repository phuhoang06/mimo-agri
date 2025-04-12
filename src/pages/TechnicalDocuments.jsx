import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import { Section } from '../components/ui';
import { technicalDocs } from '../data/technicalDocs';

function TechnicalDocuments() {
  // Sử dụng hook usePageTitle để thiết lập tiêu đề trang
  usePageTitle('Tài liệu kỹ thuật');
  
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
                    <Link to={`/tai-lieu-ky-thuat/${doc.id}`}>
                      <div className="tech-doc-thumbnail-container">
                        <img 
                          src={doc.image} 
                          alt={doc.title}
                          className="tech-doc-thumbnail" 
                        />
                      </div>
                    </Link>
                  </Col>
                  <Col xs={12} sm={8} md={9}>
                    <div className="tech-doc-info">
                      <Link to={`/tai-lieu-ky-thuat/${doc.id}`} className="text-decoration-none">
                        <h5 className="tech-doc-title">{doc.title}</h5>
                      </Link>
                      <p className="tech-doc-description">{doc.description}</p>
                      <div className="mt-2">
                        <Link to={`/tai-lieu-ky-thuat/${doc.id}`} className="btn btn-sm btn-outline-primary">
                          Xem chi tiết
                        </Link>
                      </div>
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
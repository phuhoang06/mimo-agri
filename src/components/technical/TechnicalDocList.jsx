import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getTechnicalDocs } from '../../data/technicalDocs';

function TechnicalDocList({ limit = 5 }) {
  const docs = getTechnicalDocs(limit);
  
  return (
    <div className="youtube-list">
      {docs.map(doc => (
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
                <div className="tech-doc-meta">
                  <small className="text-muted">
                    Ngày đăng: {doc.publishDate || '10/06/2023'}
                    {doc.author && <span> | Tác giả: {doc.author}</span>}
                  </small>
                </div>
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
  );
}

export default TechnicalDocList; 
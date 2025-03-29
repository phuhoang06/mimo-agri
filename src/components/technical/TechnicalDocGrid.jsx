import React from 'react';
import { Row, Col } from 'react-bootstrap';
import TechnicalDocCard from './TechnicalDocCard';
import { getTechnicalDocs } from '../../data/technicalDocs';

function TechnicalDocGrid({ limit = 5 }) {
  const docs = getTechnicalDocs(limit);
  
  return (
    <Row className="g-2 five-cards-row">
      {docs.map(doc => (
        <Col key={doc.id} xs={12} sm={6} md={4} lg={limit === 5 ? true : 3}>
          <TechnicalDocCard doc={doc} />
        </Col>
      ))}
    </Row>
  );
}

export default TechnicalDocGrid; 
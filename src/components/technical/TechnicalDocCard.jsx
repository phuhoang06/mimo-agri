import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function TechnicalDocCard({ doc, showFullDescription = false }) {
  return (
    <Card className="technical-doc-card youtube-style">
      <Card.Img variant="top" src={doc.image} alt={doc.title} />
      <Card.Body className="p-2">
        <Card.Title className="doc-title mb-0">{doc.title}</Card.Title>
        {showFullDescription && (
          <Card.Text className="small mt-1">{doc.description}</Card.Text>
        )}
        <Link 
          to={`/tai-lieu-ky-thuat/${doc.id}`} 
          className="stretched-link"
          aria-label={`Xem chi tiết ${doc.title}`}
        ></Link>
      </Card.Body>
    </Card>
  );
}

export default TechnicalDocCard; 
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function NewsCard({ news }) {
  return (
    <Card className="mb-3">
      <Row className="g-0">
        <Col xs={4}>
          <img src={news.img} className="img-fluid rounded-start" alt={news.title} loading="lazy" />
        </Col>
        <Col xs={8}>
          <Card.Body>
            <Card.Title as="h6">{news.title}</Card.Title>
            <Card.Text className="small">{news.description}</Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default NewsCard;
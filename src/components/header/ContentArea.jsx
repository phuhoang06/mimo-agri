import React from 'react';
import { Container } from 'react-bootstrap';
import CategorySidebar from './CategorySidebar';
import Banner from './Banner';

function ContentArea() {
  return (
    <div className="content-area py-3">
      <Container>
        <div className="row">
          <CategorySidebar />
          <Banner />
        </div>
      </Container>
    </div>
  );
}

export default ContentArea; 
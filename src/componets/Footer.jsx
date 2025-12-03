import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';


const Footer = () => {
  return (
    <footer className="bg-dark text-white text-center py-4 mt-4">
      <Container>
        <Row>
          <Col md={6}>
            <p className="mb-0">AURA</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
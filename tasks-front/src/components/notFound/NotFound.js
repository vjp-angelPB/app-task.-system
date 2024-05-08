import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container className="d-flex vh-100 justify-content-center align-items-center">
            <Row>
                <Col className="text-center">
                    <h2 className="display-3">Page Not Found</h2>
                    <p className="lead">Sorry, the page you are looking for does not exist.</p>
                </Col>
            </Row>
        </Container>
    );
};

export default NotFound;

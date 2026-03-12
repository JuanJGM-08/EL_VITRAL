import React from 'react';
import {Container, Row, Col, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Home = () => {
    return(
        <Container classname="mt-5">
            <Row className="text-center">
                <Col>
                <h1>Bienvenido a EL VITRAL</h1>
                <p className='lead'>Especialistas en vidrio, espejo y aluminio</p>
                <Button as={Link} to="/catalogo" variant="primary" size="lg" className="me-2">Ver Catalogo</Button>
                <Button as={Link} to="/cotizar" variant="success" size="lg">Cotizar Ahora</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default Home;
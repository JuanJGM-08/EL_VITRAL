import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { productoService } from '../services/productoService';

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await productoService.listar();
        setProductos(res.data || []);
      } catch (err) {
        setError('Error cargando los productos');
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1 className="mb-4">Catalogo de Productos</h1>
      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        {productos.map((p) => (
          <Col md={4} className="mb-4" key={p.id}>
            <Card>
              <Card.Img variant="top" src={p.imagen_url || 'https://via.placeholder.com/300'} />
              <Card.Body>
                <Card.Title>{p.nombre}</Card.Title>
                <Card.Text>{p.descripcion}</Card.Text>
                <Card.Text>
                  <strong>Precio base:</strong> ${p.precio_base} por {p.unidad_medida}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Catalogo;

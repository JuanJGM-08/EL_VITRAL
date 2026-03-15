import React, {useState} from 'react';
import { Container, Form, Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { authService } from '../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intento de login con:', { email, password });
    // TO DO: conectar autenticacion con backend
  };

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await authService.login(email, password);

            console.log("Login:", response.data);

        } catch (error) {

            console.error("Error en login:", error);

        }
    };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <Card>
        <Card.Header as="h4">Iniciar Sesion</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electronico</Form.Label>
              <Form.Control
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Ingresar
            </Button>
          </Form>

          <div className="text-center mt-3">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </div>
        </Card.Body>
      </Card>
        <Card>
            <Card.Header as="h4">Iniciar Sesion</Card.Header>

            <Card.Body>

                <Form onSubmit={handleSubmit}>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Ingresar
                    </Button>

                </Form>

                <div className="text-center mt-3">
                    ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
                </div>

            </Card.Body>
        </Card>
    </Container>
  );
};

export default Login;

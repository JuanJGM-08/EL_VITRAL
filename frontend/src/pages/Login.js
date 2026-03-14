import React, {useState}  from 'react';
import { Container, Form, Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState ('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await api.post("/login", {
                email,
                password
            });

            console.log('Intento de login con:', response.data);

        } catch (error) {

            console.error('Error en login:', error);

        }
    };

return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
        <Card>
            <Card.Header as="h4">Iniciar Sesion</Card.Header>
            <Card.Body>

                <Form onSubmit={handleSubmit}>

                    <form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Correo Electronico</Form.Label>
                        <Form.Control
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    </form.Group>

                    <form.Group className="mb-3" controlId="formPassword">
                        <form.Label>Contraseña</form.Label>
                        <form.control
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    </form.Group>

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
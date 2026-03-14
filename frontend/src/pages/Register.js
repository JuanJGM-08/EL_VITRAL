import React, {useState} from 'react';
import { Container, Form, Button, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../services/api';

const Register = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Las contraseñas no coinciden");
            return;
        }

        try {

            const response = await api.post("/register", {
                nombre,
                email,
                password
            });

            console.log("Registro con:", response.data);

        } catch (error) {

            console.error("Error en registro:", error);

        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px'}}>
            <Card>
                <Card.Header as="h4">Registro</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <form.Group className="mb-3" controlId="formNombre">
                            <form.Label>Nombre</form.Label>
                            <form.Control
                            type="text"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            />
                        </form.Group>

                        <form.Group className="mb-3" controlId="formEmail">
                            <form.Label>Correo Electronico</form.Label>
                            <form.control
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

                        <form.Group className="mb-3" controlId="formConfirmPassword">
                            <form.Label>Confirman Contraseña</form.Label>
                            <form.control
                            type="password"
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            />
                        </form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Registrarte
                        </Button>
                    </Form>

                    <div className="text-center mt-3">
                        ¿Ya tiene cuenta? <Link to="/login">Inicia sesion</Link>
                    </div>
                </Card.Body>
            </Card>

        </Container>
    );
};

export default Register;
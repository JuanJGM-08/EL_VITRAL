import {Link, useNavigate} from 'react-router-dom';
import {Navbar, Nav, Container, Button} from 'react-bootstrap';
import {useAuth} from '../contexts/AuthContext';

const Navegacion = () => {
    const {usuario, logout} = useAuth();
    const navigate = useNavigate();

    const handleLogout = () =>{
        logout();
        navigate('/');
    }
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">EL VITRAL</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link> 
                        <Nav.Link as={Link} to="/catalogo">Catalogo</Nav.Link>
                        <Nav.Link as={Link} to="/cotizar">Cotizar</Nav.Link>
                        {usuaio && <Nav.Link as={Link} to="/mis-pedidos">Mis Pedidos</Nav.Link>}
                        {usuario?.rol === 'admin' && <Nav.Link as={Link} to="/admin">Admin</Nav.Link>}
                    </Nav>
                    <Nav>
                        {usuario ? (
                            <>
                            <Navbar.Text className="me-2">Hola, {usuario.nombre}</Navbar.Text>
                            <Button variant="outline-secondary" size="sm" onClick={handleLogout}>Cerrar Sesion</Button>
                            </>
                        ) : (
                            <>
                            <Nav.Link as={Link} to="/login">Iniciar Sesion</Nav.Link>
                            <Nav.Link as={Link} to="/registro">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navegacion;

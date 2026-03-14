import React, {useState, useEffect} from 'react';
import {Container, Form, Button, Row, Col, Card, Alert, Table}  from 'react-bootstrap';
import {productoService} from '../services/productoService';
import {cotizacionService} from '../services/cotizacionService';

const Cotizar = () => {
    const [productos, setProductos] = useState([]);
    const [cliente, setCliente] = useState({nombre: '', email: '', telefono: '', direccion: ''});
    const [productoActual, setProductoActual] = useState({
        producto_id: '',
        cantidad: 1,
        medida_largo: '',
        medida_ancho: '',
        grosor:''
    });
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [exito, setExito] = useState('');

    useEffect(() => {
        const cargarProductos = async () => {
            try{
                const res = await productoService.listar();
                setProductos(res.data);
            } catch (err){
                setError('Error al cargar los productos');
            }
        };
        cargarProductos();
    }, []);

    const agregarItem = () => {
        if (!productoActual.producto_id || productoActual.cantidad < 1) {
            setError('seleccione el producto y cantidad valida');
            return;
        }
        const prod = productos.find(p => p.id === parseInt(productoActual.producto_id));
        if ((prod.tipo === 'vidrio' || prod.tipo === 'espejo') && (!productoActual.medida_largo || !productoActual.medida_ancho)) {
            setError('Para vidrio o espejo debe ingresar medidas');
            return;
        }
        setItems([...items, { ...productoActual, id: Date.now(), nombre: prod.nombre}]);
        setProductoActual({ producto_id: '', cantidad: 1, medida_largo: '', medida_ancho: '', grosor: ''});
        setError('');
    };

    const eliminarItem = (id) => setItems(items.filter(i => i.id !== id));

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (items.length === 0) {
            setError('Agregue al menos un producto');
            return;
        }
        setLoading(true);
        try{
            await cotizacionService.crear({cliente, productos: items});
            setExito('Cotizacion enviada. Va a recibir un correo con los detalles.');
            setCliente({nombre: '', email: '', telefono: '', direccion: ''});
            setItems([]);
        } catch (err){
            setError('Error al enviar cotizacion');
        } finally{
            setLoading(false);
        }
    };

    return(
        <Container className="mt-4">
            <h1>Cotizacion en linea</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            {exito && <Alert variant="success">{exito}</Alert>}
            <Row>
                <Col md={6}>
                <Card className="mb-3">
                    <Card.Header>Datos del cliente</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" value={cliente.nombre} onChange={e => setCliente({...cliente, nombre: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" value={cliente.email} onChange={e => setCliente({...cliente, email: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Telefono</Form.Label>
                                <Form.Control type="text" value={cliente.telefono} onChange={e => setCliente({...cliente, telefono: e.target.value})}/>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Direccion</Form.Label>
                                <Form.Control type="text" value={cliente.direccion} onChange={e => setCliente({...cliente, direccion: e.target.value})}/>
                            </Form.Group>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
                <Col md={6}>
                <Card className="mb-3">
                    <Card.Header>Agregar Producto</Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Producto</Form.Label>
                                <Form.Select value={productoActual.producto_id} onChange={e => setProductoActual({...productoActual, producto_id: e.target.value})}>
                                    <option value="">seleccione...</option>
                                    {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                                </Form.Select>
                            </Form.Group>
                            <Row>
                                <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Largo (cm)</Form.Label>
                                    <Form.Control type="number" value={productoActual.medida_largo} onChange={e => setProductoActual({...productoActual, medida_largo: e.target.value})}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                <Form.Group className="mb-2">
                                    <Form.Label>Ancho (cm)</Form.Label>
                                    <Form.Control type="number" value={productoActual.medida_ancho} onChange={e => setProductoActual({...productoActual, medida_ancho: e.target.value})}/>
                                </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mb-2">
                                <Form.Label>Cantidad</Form.Label>
                                <Form.Control type="number" min="1" value={productoActual.cantidad} onChange={e => setProductoActual({...productoActual, cantidad: parseInt(e.target.value)})}/>
                            </Form.Group>
                            <Button variant="primary" onClick={agregarItem}>Agregar</Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
            {items.length > 0 && (
                <Card>
                    <Card.Header>Productos Seleccionados</Card.Header>
                    <Card.Body>
                        <Table striped>
                            <thead>
                                <tr><th>Producto</th><th>Medidas</th><th>Cantidad</th><th></th></tr>
                            </thead>
                            <tbody>
                                {items.map(i => (
                                    <tr key={i.id}>
                                        <td>{i.nombre}</td>
                                        <td>{i.medida_largo}x{i.medida_ancho}</td>
                                        <td>{i.cantidad}</td>
                                        <td><Button size="sm" variant="danger" onClick={() => eliminarItem(i.id)}>Eliminar</Button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <Button variant="success" onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Enviando...' : 'Generar Cotizacion'}
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
};

export default Cotizar;
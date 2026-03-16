import React, {useEffect, useState} from 'react';
import {Container, Tabs, Tab, Table, Button, Form, Modal} from 'react-bootstrap'
import api from '../services/api';

const Admin = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [productos, setProductos] = useState([]);
    const [cotizaciones, setCotizaciones] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [productoEdit, setProductoEdit] = useState({nombre: '', tipo: 'vidrio', precio_base: '' });
    
    const cargarUsuarios = async () => {
        const res = await api.get('/admin/usuarios');
        setUsuarios(res.data);
    };

    const cargarProductos = async () => {
        const res = await api.get('/productos'); 
        setProductos(res.data);
    };

    const cargarCotizaciones = async () => {
        const res = await api.get('/admin/cotizaciones');
        setCotizaciones(res.data);
    };

    useEffect(() =>{
        cargarUsuarios();
        cargarProductos();
        cargarCotizaciones();
    }, []);

    const aprobarAdmin = async (id) => {
            await api.patch(`/admin/usuarios/${id}/aprobar`);
            cargarUsuarios();
        };
        
    const guardarProducto = async () => {
        if (productoEdit.id) {
            await api.put(`/admin/productos/${productoEdit.id}`, productoEdit);
        } else {
            await api.post('/admin/productos', productoEdit);
        }
        setShowModal(false);
        cargarProductos();
    };
    
    const eliminarProducto = async (id) => {
        if (window.confirm('¿Eliminar producto?')) {
            await api.delete(`/admin/productos/${id}`);
            cargarProductos();
        }
    };
    
    return (
    <Container className="mt-4">
        <h1>Panel de Administracion</h1>
        <Tabs defaultActiveKey="usuarios">
            <Tab eventKey="usuarios" title="Usuarios">
                <Table striped className="mt-3">
                    <thead>
                        <tr><th>ID</th><th>Nombre</th><th>Email</th><th>Rol</th><th>Aprobado</th><th>Acciones</th></tr>
                    </thead>
                    <tbody>
                        {usuarios.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre}</td>
                                <td>{u.email}</td>
                                <td>{u.rol}</td>
                                <td>{u.aprobado ? 'Si' : 'No'}</td>
                                <td>
                                    {u.rol === 'admin' && !u.aprobado && (
                                        <Button size="sm" variant="success" onClick={() => aprobarAdmin(u.id)}>Aprobar</Button>
                                    )}
                                </td>
                                </tr>
                            ))} 
                            </tbody>
                        </Table>
                        </Tab>
                        <Tab eventKey="productos" title="Productos">
                            <Button className="mt-2 mb-2" onClick={() => {setProductoEdit({}); setShowModal(true);}}>Nuevo Producto</Button>
                            <Table striped>
                                <thead>
                                    <tr><th>ID</th><th>Nombre</th><th>Tipo</th><th>Precio Base</th><th>Acciones</th></tr>
                                </thead>
                                <tbody>
                                    {productos.map(p =>(
                                        <tr key={p.id}>
                                            <td>{p.id}</td>
                                            <td>{p.nombre}</td>
                                            <td>{p.tipo}</td>
                                            <td>${p.precio_base}</td>
                                            <td>
                                                <Button size="sm" variant="warning" onClick={() => { setProductoEdit(p); setShowModal(true); }}>Editar</Button>
                                                <Button size="sm" variant="danger" className="ms-2" onClick={() => eliminarProducto(p.id)}>Eliminar</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Tab>
                        <Tab eventKey="cotizaciones" title="Cotizaciones">
                            <Table striped className="mt-3">
                                <thead> 
                                    <tr><th>ID</th><th>Cliente</th><th>Email</th><th>Total</th><th>Fecha</th><th>Estado</th></tr>
                                </thead>
                                <tbody>
                                    {cotizaciones.map(c => (
                                        <tr key={c.id}>
                                            <td>{c.id}</td>
                                            <td>{c.nombre_cliente}</td>
                                            <td>{c.email_cliente}</td>
                                            <td>${c.total}</td>
                                            <td>{new Date(c.fecha_cotizacion).toLocaleDateString()}</td>
                                            <td>{c.estado}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Tab>
                    </Tabs>
                    
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{productoEdit.id ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control value={productoEdit.nombre} onChange={e => setProductoEdit({...productoEdit, nombre: e.target.value})}/>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Select value={productoEdit.tipo} onChange={e => setProductoEdit({...productoEdit, tipo: e.target.value})}>
                                        <option value="vidrio">Vidrio</option>
                                        <option value="espejo">Espejo</option>
                                        <option value="aluminio">Aluminio</option>
                                        <option value="herraje">Herraje</option>
                                        <option value="insumo">Insumo</option>
                                    </Form.Select>
                               </Form.Group>
                               <Form.Group className="mb-3">
                                <Form.Label>Precio Base</Form.Label>
                                <Form.Control type="number" value={productoEdit.precio_base} onChange={e => setProductoEdit({...productoEdit, precio_base: e.target.value})}/>
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                            <Button variant="primary" onClick={guardarProducto}>Guardar</Button>
                        </Modal.Footer>
                    </Modal>
                </Container>
    );
};
export default Admin;
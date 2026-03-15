const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./src/config/database');
const Producto = require('./src/models/Producto');
const Cotizacion = require('./src/models/Cotizacion');
const CotizacionDetalle = require('./src/models/CotizacionDetalle');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    await sequelize.authenticate();
    return res.status(200).json({ ok: true, db: 'connected' });
  } catch (error) {
    return res.status(500).json({ ok: false, db: 'disconnected', error: error.message });
  }
});

app.get('/api/productos', async (_req, res) => {
  try {
    const productos = await Producto.findAll({ where: { activo: true } });
    return res.json(productos);
  } catch (error) {
    return res.status(500).json({ error: 'No se pudieron cargar productos' });
  }
});

app.post('/api/cotizaciones', async (req, res) => {
  const { cliente, productos } = req.body;

  if (!cliente || !cliente.nombre || !cliente.email) {
    return res.status(400).json({ error: 'Datos del cliente incompletos' });
  }

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Debe incluir al menos un producto' });
  }

  const transaction = await sequelize.transaction();

  try {
    const cotizacion = await Cotizacion.create(
      {
        nombre_cliente: cliente.nombre,
        email_cliente: cliente.email,
        telefono_cliente: cliente.telefono || null,
        direccion_cliente: cliente.direccion || null,
        estado: 'vigente',
      },
      { transaction }
    );

    for (const item of productos) {
      await CotizacionDetalle.create(
        {
          cotizacion_id: cotizacion.id,
          producto_id: item.producto_id,
          descripcion: item.nombre || null,
          cantidad: item.cantidad,
          medida_largo: item.medida_largo || null,
          medida_ancho: item.medida_ancho || null,
          grosor: item.grosor || null,
        },
        { transaction }
      );
    }

    await transaction.commit();
    return res.status(201).json({ message: 'Cotizacion creada', id: cotizacion.id });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ error: 'No se pudo crear la cotizacion' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const dotenv = require('dotenv');
const { sequelize } = require('./src/models');

dotenv.config();
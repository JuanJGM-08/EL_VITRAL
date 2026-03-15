# Diagnóstico técnico rápido del proyecto EL VITRAL

## Estado general

El repositorio contiene una base inicial de frontend (React + React-Bootstrap), modelos de backend (Node + Sequelize) y un script SQL de base de datos. Actualmente está en un estado **prototipo/incompleto**: hay varias piezas críticas faltantes para ejecutar end-to-end.

## Errores críticos detectados

1. **Export incorrecto en navbar**
   - En `frontend/src/components/Navbar.js` se define `Navegacion`, pero se exporta `Navigation`.
   - Esto genera error de compilación/importación por identificador no definido.

2. **Uso incorrecto de componentes de React-Bootstrap en formularios**
   - En `Login.js` y `Register.js` se usa `<form.Group>`, `<form.Label>`, `<form.Control>` en minúsculas.
   - Debe ser `<Form.Group>`, `<Form.Label>`, `<Form.Control>`.
   - Esto rompe el render o causa componentes HTML inexistentes.

3. **Rutas inconsistentes entre enlaces**
   - En navbar se usa `/registro`.
   - En login se enlaza a `/register`.
   - Esta diferencia causa navegación rota si el router usa solo una de las dos rutas.

4. **Imports a servicios no existentes**
   - `Catalogo.js` y `Cotizar.js` importan:
     - `../services/productoService`
     - `../services/cotizacionService`
   - No existe carpeta `frontend/src/services`, por lo que el build fallará.

5. **Typo visible en JSX**
   - En `Catalogo.js` aparece `classNmae` en vez de `className`.
   - El estilo no se aplica al título.

6. **Riesgo de error por acceso a objeto nulo en cotización**
   - En `Cotizar.js` se usa `prod.tipo` después de `find` sin validar si `prod` existe.
   - Si no se encuentra el producto (dato inconsistente o parseo), puede lanzar error en runtime.

7. **Backend sin archivo de entrada comprometido**
   - `backend/package.json` define `server.js` en scripts, pero ese archivo no está en el repo.
   - `npm start` y `npm run dev` fallarán.

8. **Script SQL con separador inválido**
   - En `backend/dbcodigo` se usa `///////////////////////////////////////` como separador.
   - No es comentario SQL válido y puede romper la ejecución del script.

9. **Tipo de dato inconsistente en modelo Usuario**
   - Campo `aprobado` en modelo Sequelize está definido como `DATE` con `defaultValue: false`.
   - Semánticamente debería ser booleano, alineado con la base (`BOOLEAN`).

## Recomendaciones priorizadas

### Prioridad alta (hacer primero)

1. Corregir errores de compilación del frontend:
   - export del navbar,
   - componentes `Form.*` en Login/Register,
   - typo `classNmae`,
   - unificar rutas (`/registro` o `/register`).

2. Crear capa mínima de servicios en frontend:
   - `frontend/src/services/productoService.js`
   - `frontend/src/services/cotizacionService.js`
   - con cliente HTTP (axios) y URL base configurable.

3. Completar backend ejecutable:
   - agregar `backend/server.js`,
   - conectar Express + CORS + JSON parser,
   - montar rutas básicas (`/api/productos`, `/api/cotizaciones`).

4. Corregir script SQL:
   - reemplazar separadores no válidos por comentarios `-- ...`.

### Prioridad media

1. Agregar validaciones de negocio en frontend y backend:
   - no permitir cantidades inválidas,
   - validar email/teléfono,
   - manejar faltantes de producto.

2. Alinear modelos Sequelize con el esquema SQL y agregar asociaciones (`belongsTo`, `hasMany`).

3. Implementar manejo de errores estandarizado en API.

### Prioridad baja

1. Mejorar documentación:
   - `README.md` con pasos de instalación, variables de entorno y scripts.

2. Definir scripts en frontend (`start`, `build`, `test`) y herramienta de calidad (`eslint` + `prettier`).

3. Añadir pruebas mínimas:
   - backend: pruebas de endpoints,
   - frontend: pruebas de render de páginas críticas.

## Resultado esperado tras aplicar recomendaciones

Con las correcciones de prioridad alta, el proyecto pasaría de estado prototipo roto a una base funcional mínima (frontend compilando y backend arrancando), permitiendo iterar luego en autenticación, cotizaciones e inventario.

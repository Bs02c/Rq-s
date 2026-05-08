# Rq's — Gestión de Repuestos Industriales

Sistema web para gestionar y controlar repuestos industriales. Permite registrar productos (repuestos), consultar su stock y crear requisiciones de compra/entrega.

## Estructura del repositorio

```
Rqs/
├── backend/          Node.js + Express — API REST
├── frontend/         React + Vite — SPA
├── docker/           Dockerfiles + schema SQL
├── docker-compose.yml
└── .env              Credenciales PostgreSQL (no commitear)
```

## Arranque del proyecto

```bash
# Levantar todos los servicios
docker compose up --build

# Frontend: http://localhost:8080
# Backend:  http://localhost:3000
# Postgres: localhost:5432
```

El orden de arranque está garantizado por `depends_on` + healthchecks:
`postgres` → `backend` (GET /health) → `frontend`

---

## Backend

**Runtime:** Node.js 24-alpine, ES6 modules (`"type": "module"`)  
**Framework:** Express 5.2.1  
**Puerto:** 3000  
**Dependencias:** `express`, `pg`, `cors`

### Estructura en capas (aplicada a cada feature)

```
Routes → Controller → Service → Repository → PostgreSQL
```

Cada feature vive en su propia carpeta dentro de `backend/src/`:

```
backend/src/
├── database/
│   └── connection.js       cliente pg, usa env vars POSTGRES_*
├── products/
│   ├── product.routes.js
│   ├── product.controller.js
│   ├── product.service.js
│   └── product.repository.js
└── requisiciones/
    ├── requisicion.routes.js
    ├── requisicion.controller.js
    ├── requisicion.service.js
    └── requisicion.repository.js
```

### Endpoints

#### Products — `/products`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/products` | Todos los productos |
| POST | `/products` | Crear producto |
| PATCH | `/products/:codigo` | Actualizar campos (parcial) |
| DELETE | `/products/:codigo` | Eliminar por código |

Body POST/PATCH:
```json
{
  "codigo": "string (PK)",
  "nombre": "string",
  "saldo": "int",
  "costo": "int",
  "proveedor": "string",
  "ubicacion": "string",
  "stock_minimo": "int"
}
```

#### Requisiciones — `/requisicion`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/requisicion` | Todas las requisiciones |
| GET | `/requisicion/:consecutivo` | Una específica |
| POST | `/requisicion` | Crear requisición |

Body POST:
```json
{
  "solicitante": "string",
  "repartidor": "string",
  "destino": "string",
  "codigo_solicitado": "string (FK → product.codigo)",
  "cantidad": "int",
  "observaciones": "string"
}
```

#### Health check
`GET /health` — usado por Docker Compose para el healthcheck del backend.

---

## Base de datos

**Engine:** PostgreSQL 16-alpine  
**Nombre BD:** `dbRQs`  
**Schema inicial:** `docker/tables.sql` (se ejecuta automáticamente al crear el contenedor)

```sql
-- Tabla maestra de repuestos
CREATE TABLE product (
    codigo        VARCHAR(50)  PRIMARY KEY,
    nombre        VARCHAR(200) NOT NULL,
    saldo         INT          NOT NULL,
    costo         INT          NOT NULL,
    proveedor     VARCHAR(100),
    fecha_ingreso DATE         DEFAULT CURRENT_DATE NOT NULL,
    ubicacion     VARCHAR(100),
    stock_minimo  INT
);

-- Solicitudes de entrega de repuestos
CREATE TABLE requisiciones (
    consecutivo       SERIAL       PRIMARY KEY,
    fecha_solicitud   DATE         DEFAULT CURRENT_DATE NOT NULL,
    solicitante       VARCHAR(100) NOT NULL,
    repartidor        VARCHAR(100) NOT NULL,
    destino           VARCHAR(100) NOT NULL,
    codigo_solicitado VARCHAR(50)  NOT NULL REFERENCES product(codigo),
    cantidad          INT          NOT NULL,
    observaciones     VARCHAR(255)
);
```

---

## Frontend

**Framework:** React 19.2.4 + Vite 8.0.1  
**Routing:** React Router DOM 7.14.1  
**Puerto (prod):** 8080 → Nginx :80  
**API base URL:** `http://localhost:3000` (variable `VITE_API_URL` en `.env`)

### Routing (`App.jsx`)

| Ruta | Componente | Estado |
|------|-----------|--------|
| `/productos` | `ProductList` | ✅ Implementado |
| `/productos/nuevo` | `ProductForm` | 🚧 Pendiente |
| `/productos/:codigo` | `ProductDetail` | 🚧 Pendiente |
| `/requisiciones` | `RequisicionList` | 🚧 Pendiente |
| `/requisiciones/nueva` | `RequisicionForm` | 🚧 Pendiente |

### Estructura del frontend

```
frontend/src/
├── main.jsx          entrada React, envuelve con BrowserRouter
├── App.jsx           definición de rutas
├── pages/
│   ├── ProductList.jsx      lista productos con fetch al backend
│   ├── ProductForm.jsx      🚧 stub vacío
│   ├── ProductDetail.jsx    🚧 stub vacío
│   ├── RequisicionList.jsx  🚧 stub vacío
│   └── RequisicionForm.jsx  🚧 stub vacío
└── services/
    ├── product.service.js      getAllProducts, createProducts, updateProduct, getProductByCode
    └── requisicion.service.js  getAllRq, getSpecificRq, createRq
```

### Nginx (`frontend/nginx.conf`)

Sirve el build estático de React y redirige todas las rutas a `index.html` para soportar React Router (SPA routing).

---

## Docker

### Servicios (`docker-compose.yml`)

| Servicio | Imagen / Build | Puerto host | Depende de |
|----------|---------------|-------------|------------|
| `postgres` | postgres:16-alpine | 5432 | — |
| `backend` | docker/dockerfile.backend | 3000 | postgres (healthy) |
| `frontend` | docker/dockerfile.frontend | 8080 | backend (healthy) |

### dockerfile.backend

```dockerfile
FROM node:24-alpine
RUN apk --no-cache add curl   # necesario para el healthcheck
WORKDIR /app
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./
CMD ["node", "index.js"]
```

### dockerfile.frontend (multi-stage)

- **Stage 1 (builder):** node:24-alpine → `npm run build` → genera `/dist`
- **Stage 2 (runtime):** nginx:alpine → sirve `/dist` con `nginx.conf`

---

## Reglas de negocio pendientes de implementar

1. **Deduplicación de productos:** Si se intenta crear un producto con un `codigo` ya existente, sumar las unidades al `saldo` en lugar de rechazar o duplicar.

2. **Alerta de stock mínimo:** Cuando `saldo < stock_minimo`, marcar el producto con alerta visual (rojo) en el frontend.

3. **Semáforo de tiempo en requisiciones:**
   - Verde: recién creada (0–30 min)
   - Amarillo: 30–60 min sin atender
   - Rojo: más de 60 min sin atender

---

## Convenciones del proyecto

- El backend usa **ES6 modules** (`import`/`export`), no CommonJS.
- Cada feature del backend sigue estrictamente la cadena: `routes → controller → service → repository`.
- Las queries SQL van **solo** en el repository, nunca en el controller ni en el service.
- El frontend consume la API desde los archivos en `services/` — los componentes no hacen `fetch` directamente.
- Las credenciales de la BD viven en el archivo `.env` raíz y Docker Compose las inyecta como variables de entorno.

---

## Seguridad

### Validación de inputs en el backend

- Validar en el **controller** antes de pasar datos al service: tipos, presencia de campos obligatorios y longitudes máximas alineadas con el schema SQL (`VARCHAR(50)`, `VARCHAR(200)`, etc.).
- Rechazar requests con campos extra no esperados — no pasar `req.body` completo al service; desestructurar solo los campos conocidos.
- `cantidad`, `saldo`, `costo` y `stock_minimo` deben ser enteros positivos; rechazar strings, negativos y cero donde no tenga sentido de negocio.
- `codigo_solicitado` en requisiciones debe validarse como string no vacío antes de llegar al repository (la FK de PostgreSQL es la última línea de defensa, no la única).

### Variables de entorno sensibles

- El archivo `.env` **nunca se commitea** — está en `.gitignore`. Si no existe, agregarlo.
- El backend accede a credenciales solo a través de `process.env.POSTGRES_*`; ningún valor de conexión puede estar hardcodeado en `backend/src/database/connection.js` ni en ningún otro archivo.
- En Docker, las variables se inyectan vía `environment:` en `docker-compose.yml`; no se pasan como argumentos de build ni se copian al interior de la imagen.
- `VITE_API_URL` en el frontend es la única variable de entorno del cliente; no exponer ninguna credencial con prefijo `VITE_`.

### Queries parametrizadas en los repositories

- **Toda** query SQL que incorpore datos del usuario debe usar parámetros posicionales de `pg` (`$1`, `$2`, …`); prohibido concatenar strings con datos externos.
- Ejemplo correcto en cualquier repository:
  ```js
  // Correcto
  await pool.query('SELECT * FROM product WHERE codigo = $1', [codigo]);
  // Incorrecto — nunca hacer esto
  await pool.query(`SELECT * FROM product WHERE codigo = '${codigo}'`);
  ```
- Esta regla aplica a INSERT, UPDATE, DELETE y cualquier cláusula WHERE — sin excepciones.

### Headers de seguridad en Express

- Instalar y activar `helmet` en `backend/index.js` como primer middleware global:
  ```js
  import helmet from 'helmet';
  app.use(helmet());
  ```
- Configurar CORS explícitamente con una lista de orígenes permitidos en lugar de `origin: '*'` en producción; para entorno local Docker puede mantenerse `'*'` pero documentarlo como deuda técnica.
- No exponer el header `X-Powered-By` (helmet lo elimina por defecto).
- Los errores devueltos por la API no deben incluir stack traces ni mensajes internos de PostgreSQL — solo un mensaje genérico y el código HTTP apropiado.

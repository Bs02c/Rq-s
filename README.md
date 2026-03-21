Rq's — Descripción del Proyecto
Rq's es un sistema web de gestión y control de repuestos industriales, desarrollado con el objetivo de aprender desarrollo fullstack moderno usando JavaScript como lenguaje principal.

Stack tecnológico

Frontend: HTML + CSS + React + vite
Backend: Node.js + Express
Base de datos: PostgreSQL
Infraestructura: Docker (dev y prod) + WSL2 + VSCode


Arquitectura de software
Se usa una arquitectura en 3 capas:

Presentación (Frontend): Interfaz de usuario que corre en el navegador. Se comunica con el backend exclusivamente a través de peticiones HTTP, enviando y recibiendo JSON. Nunca accede directamente a la base de datos.
Lógica de negocio (Backend): API REST construida con Node.js y Express. Es el cerebro de la aplicación. Recibe las peticiones del frontend, aplica las reglas del negocio y se comunica con la base de datos.
Persistencia (Base de datos): PostgreSQL almacena toda la información de forma permanente. Solo el backend puede hablar con ella.


Patrones de diseño aplicados
MVC (Model - View - Controller)
Separa la aplicación en tres roles claros. El Model representa los datos y sabe cómo hablar con PostgreSQL. La View es el frontend. El Controller es el intermediario que recibe peticiones, consulta el Model y devuelve respuestas al frontend.
Repository Pattern
Toda interacción con la base de datos vive en un único lugar (el repositorio). Si en el futuro se cambia de motor de base de datos, solo se modifica ese archivo sin afectar el resto del código.
Service Layer
Entre el Controller y el Repository existe una capa de servicios donde viven las reglas propias del negocio, por ejemplo: no duplicar un repuesto si ya existe (sumar unidades), generar alertas cuando el stock baja del mínimo configurado, o escalar el estado de una requisición si lleva más de 30 minutos sin ser gestionada.

Estructura de carpetas del backend
backend/src/
features/
└── repuestos/
    ├── repuesto.repository.js  ← habla con la BD
    ├── repuesto.service.js     ← lógica de negocio
    ├── repuesto.controller.js  ← maneja HTTP
    └── repuesto.routes.js      ← mapea URLs
└── requisiciones/
    ├── requisicion.repository.js  ← habla con la BD
    ├── requisicion.service.js     ← lógica de negocio
    ├── requisicion.controller.js  ← maneja HTTP
    └── requisicion.routes.js      ← mapea URLs
├── middlewares/     ← manejo centralizado de errores y validaciones
├── config/          ← conexión a PostgreSQL y variables de entorno
└── index.js         ← punto de entrada del servidor
└── bd               ← Conexión con PostgresSQL

Reglas de negocio principales definidas

Si se intenta registrar un repuesto con un código ya existente, se suman las unidades en lugar de crear un duplicado.
Se emite una alerta roja cuando la cantidad de un repuesto baja del stock mínimo configurado.
Las requisiciones recibidas generan una alerta verde. Si no son gestionadas en 30 minutos, la alerta se vuelve amarilla. Pasada una hora, se vuelve roja urgente.

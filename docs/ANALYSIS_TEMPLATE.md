# [TÍTULO DEL ANÁLISIS] — Análisis Técnico

> **Fecha:** YYYY-MM-DD  
> **Autor:** [nombre]  
> **Estado:** Borrador | En revisión | Aprobado

---

## 1. Problema

### Descripción
[Qué falla o qué comportamiento falta. Sé concreto: síntoma observable, no suposición.]

### Contexto
[Dónde ocurre: endpoint afectado, componente, flujo de usuario. Ejemplo: `POST /requisicion` cuando el `codigo_solicitado` no existe en `product`.]

### Criterio de aceptación
- [ ] [Condición verificable que indica que el problema está resuelto]
- [ ] [Otra condición]

---

## 2. Impacto Arquitectural

### Backend (Node.js 24 + Express 5)
| Capa | Archivo afectado | Tipo de cambio |
|------|-----------------|----------------|
| Routes | `backend/src/[feature]/[feature].routes.js` | — |
| Controller | `backend/src/[feature]/[feature].controller.js` | — |
| Service | `backend/src/[feature]/[feature].service.js` | — |
| Repository | `backend/src/[feature]/[feature].repository.js` | — |

[Descripción del impacto: ¿se añade lógica de negocio, se cambia contrato de API, se modifica manejo de errores?]

### Frontend (React 19 + Vite 8)
| Capa | Archivo afectado | Tipo de cambio |
|------|-----------------|----------------|
| Service | `frontend/src/services/[feature].service.js` | — |
| Page | `frontend/src/pages/[Page].jsx` | — |

[Descripción del impacto: ¿cambia el contrato del servicio, se añade estado, se actualiza la UI?]

### Base de datos (PostgreSQL 16)
```sql
-- Migraciones requeridas (si aplica)
-- Ejemplo: nuevo índice, columna, constraint

-- Ninguna / Ver sección de implementación
```

[¿Se modifica el schema de `product` o `requisiciones`? ¿Afecta `docker/tables.sql`?]

---

## 3. Propuesta de Solución

### Opción elegida
[Nombre corto de la solución. Ej: "Validación en service + upsert en repository".]

### Descripción
[Cómo funciona la solución paso a paso, siguiendo la cadena routes → controller → service → repository.]

### Alternativas descartadas
| Alternativa | Razón de descarte |
|-------------|------------------|
| [Opción A] | [Por qué no] |
| [Opción B] | [Por qué no] |

### Riesgos y mitigaciones
| Riesgo | Probabilidad | Mitigación |
|--------|-------------|------------|
| [Riesgo] | Alta/Media/Baja | [Cómo se mitiga] |

---

## 4. Plan de Implementación

### Orden de cambios
> Seguir siempre de adentro hacia afuera: BD → Repository → Service → Controller → Routes → Frontend.

1. **[Paso 1]** — `[archivo]`: [qué se hace exactamente]
2. **[Paso 2]** — `[archivo]`: [qué se hace exactamente]
3. **[Paso 3]** — `[archivo]`: [qué se hace exactamente]
4. **[Paso N]** — Verificar con `docker compose up --build` y probar el endpoint/flujo afectado.

### Verificación
```bash
# Comandos para confirmar que la solución funciona
curl -X POST http://localhost:3000/[endpoint] \
  -H "Content-Type: application/json" \
  -d '{ "[campo]": "[valor]" }'

# Respuesta esperada:
# { ... }
```

### Checklist pre-merge
- [ ] Reglas de negocio descritas en CLAUDE.md respetadas
- [ ] Las queries SQL viven únicamente en el repository
- [ ] Los componentes React consumen la API a través de `services/`
- [ ] El endpoint `/health` del backend sigue respondiendo
- [ ] `docker compose up --build` sin errores

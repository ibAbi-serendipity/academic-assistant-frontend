# Nexus Academic — versión MOCKUP

Rama `mockup`: mismo front end, pero **sin ninguna API conectada**. Todo funciona con datos simulados.

## Ejecutar

```bash
pnpm install
pnpm dev
```

No requiere `.env` ni backend.

## Cómo funciona

- Las llamadas HTTP de `src/services/*` fueron reemplazadas por funciones que devuelven datos simulados
  con la misma forma (`{ data: ... }`), por lo que contextos, páginas y componentes no cambiaron.
- `src/mocks/mockData.js`: usuario demo, documentos, base de conocimiento por palabras clave y chats de ejemplo.
- `src/mocks/mockDb.js`: "base de datos" en memoria persistida en `localStorage` (clave `mock_academic_assistant_db`).
  Para restablecer los datos de ejemplo, borra esa clave desde las DevTools.
- **Login:** cualquier usuario y contraseña no vacíos funcionan (usuario sugerido: `demo`).
- **Registro:** funciona; rechaza usernames repetidos.
- **Chat:** responde según palabras clave (python, recursividad, estructuras de datos, POO, machine learning,
  SQL) con fuentes de ejemplo; otras preguntas reciben una respuesta genérica.
- Crear, renombrar, eliminar y reabrir conversaciones funciona y se conserva al recargar.

Se eliminaron `axios`, `src/lib/api.js`, `src/api/*` y el proxy de Vite.

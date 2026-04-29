# IXOS API RESTful (v1)

API RESTful desarrollada en **Node.js** y **Express** con conexión a **PostgreSQL** mediante `pg`.
Esta versión está adaptada para su despliegue en un VPS de producción usando **PM2** y sigue la estructura de rutas `/api/v1/...`.

## Requisitos Previos para el VPS

- [Node.js](https://nodejs.org/) (v16+)
- [PostgreSQL](https://www.postgresql.org/) con la base de datos `mood_music`.
- PM2 instalado globalmente (`npm install -g pm2`).

## Instalación y Configuración (Producción)

1. **Clona el repositorio e instala las dependencias**:
   \`\`\`bash
   npm install
   \`\`\`

2. **Configura el archivo `.env`**:
   Asegúrate de que tu `.env` tenga las variables correctas como indicaste para producción:

   \`\`\`env
   NODE_ENV=production
   PORT=3002
   DATABASE_URL=postgresql://moodmusic_api:ixos_2026@127.0.0.1:5432/mood_music
   DB_SSL=false
   CORS_ORIGIN=http:*
   JWT_SECRET=tu_secreto
   JWT_REFRESH_SECRET=tu_refresh
   JWT_EXPIRES_IN=15m
   JWT_REFRESH_EXPIRES_IN=30d
   BCRYPT_SALT_ROUNDS=10
   DB_HOST=127.0.0.1
   DB_PORT=5432
   DB_USER=moodmusic_api
   DB_PASSWORD=ixos_2026
   DB_NAME=mood_music
   \`\`\`

3. **Iniciar con PM2**:
   Hemos incluido un archivo `ecosystem.config.js`. Para arrancar el servidor en tu VPS:
   \`\`\`bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   \`\`\`
   Esto asegura que la API se inicie automáticamente si el VPS se reinicia.

---

## Endpoints de la API (v1)

La API responde en el puerto \`3002\` por defecto. Todas las rutas de datos usan el prefijo \`/api/v1\`.

- **Health Check**: \`GET /health\` -> Verifica que la API esté corriendo.

### 🔐 Autenticación y Usuario
- \`POST /api/v1/auth/login\` - Iniciar sesión (Genera JWT)
- \`POST /api/v1/auth/register\` - Crear una cuenta nueva
- \`GET /api/v1/me\` - Obtener información del usuario actual (requiere \`?user_id=\`)

### 🎵 Catálogo y Música
- \`GET /api/v1/catalog\` - Resumen del catálogo musical (álbumes recientes, géneros)
- \`GET /api/v1/songs\` - Lista general de canciones
- \`GET /api/v1/songs/:id\` - Detalles de una canción
- \`GET /api/v1/artists\` - Lista de artistas
- \`GET /api/v1/artists/:id\` - Detalles de un artista
- \`GET /api/v1/moods\` - Obtener estados de ánimo configurados
- \`GET /api/v1/search?q=query\` - Búsqueda global de artistas y canciones

### 💽 Playlists y Colecciones
- \`GET /api/v1/playlists\` - Playlists públicas
- \`POST /api/v1/playlists\` - Crear una playlist
- \`GET /api/v1/playlists/:id/songs\` - Canciones de una playlist específica
- \`GET /api/v1/liked-songs\` - Canciones marcadas como "Me gusta" (requiere \`?user_id=\`)
- \`GET /api/v1/downloads\` - Canciones descargadas por el usuario (requiere \`?user_id=\`)

### 📻 Reproductor
- \`GET /api/v1/player-state\` - Obtener el último estado de reproducción guardado
- \`POST /api/v1/player-state\` - Actualizar el estado de reproducción
- \`GET /api/v1/listening-history\` - Obtener historial reciente de canciones escuchadas

---

## Códigos de Estado Comunes

- \`200 OK\`: La petición se completó correctamente.
- \`201 Created\`: El recurso se creó exitosamente.
- \`400 Bad Request\`: Faltan datos obligatorios o hay algún problema de formato.
- \`401 Unauthorized\`: Falta autenticación o es inválida (ej. sin JWT o \`user_id\`).
- \`404 Not Found\`: El recurso solicitado no existe.
- \`500 Internal Server Error\`: Problema en la conexión con la base de datos o lógica interna.

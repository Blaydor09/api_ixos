# Pruebas de la API (Comandos cURL)

Puedes usar estos comandos directamente en la consola de tu VPS para verificar que la API y la conexión a la base de datos están funcionando correctamente. 

> [!NOTE]
> Todos los comandos asumen que la API está corriendo en el puerto `3002` en local (`http://127.0.0.1:3002`). Si usaste otro puerto o dominio, asegúrate de reemplazar esa parte. En algunos endpoints (como el `user_id`), debes reemplazar los UUIDs de ejemplo (`<tu-uuid>`) con IDs reales de tu base de datos para obtener datos verdaderos.

## 1. Verificar Estado General

**Health Check (Raíz)**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/health
\`\`\`

---

## 2. Autenticación y Usuarios

**Registrar un nuevo usuario**
\`\`\`bash
curl -X POST http://127.0.0.1:3002/api/v1/auth/register \
-H "Content-Type: application/json" \
-d '{
  "username": "testuser",
  "email": "test@example.com",
  "password": "mypassword123",
  "display_name": "Test User"
}'
\`\`\`

**Iniciar sesión (Login)**
\`\`\`bash
curl -X POST http://127.0.0.1:3002/api/v1/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "test@example.com",
  "password": "mypassword123"
}'
\`\`\`

**Obtener Perfil (Me)**
Reemplaza `USER_UUID` por el ID del usuario.
\`\`\`bash
curl -X GET "http://127.0.0.1:3002/api/v1/me?user_id=USER_UUID"
\`\`\`

**Listar todos los usuarios**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/users
\`\`\`

---

## 3. Catálogo y Descubrimiento

**Ver el Catálogo (Home)**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/catalog
\`\`\`

**Listar Estados de Ánimo (Moods)**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/moods
\`\`\`

**Búsqueda Global**
\`\`\`bash
curl -X GET "http://127.0.0.1:3002/api/v1/search?q=rock"
\`\`\`

---

## 4. Canciones y Artistas

**Listar Canciones**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/songs
\`\`\`

**Detalle de una Canción específica**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/songs/SONG_UUID
\`\`\`

**Listar Artistas**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/artists
\`\`\`

**Detalle de un Artista**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/artists/ARTIST_UUID
\`\`\`

---

## 5. Playlists y Colecciones Personales

**Listar Playlists Públicas**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/playlists
\`\`\`

**Crear Playlist**
\`\`\`bash
curl -X POST http://127.0.0.1:3002/api/v1/playlists \
-H "Content-Type: application/json" \
-d '{
  "owner_id": "USER_UUID",
  "name": "Mi Playlist Favorita",
  "description": "Música para relajar",
  "visibility": "public"
}'
\`\`\`

**Ver canciones de una Playlist**
\`\`\`bash
curl -X GET http://127.0.0.1:3002/api/v1/playlists/PLAYLIST_UUID/songs
\`\`\`

**Ver Canciones Marcadas como "Me gusta" (Liked Songs)**
\`\`\`bash
curl -X GET "http://127.0.0.1:3002/api/v1/liked-songs?user_id=USER_UUID"
\`\`\`

**Ver Canciones Descargadas (Downloads)**
\`\`\`bash
curl -X GET "http://127.0.0.1:3002/api/v1/downloads?user_id=USER_UUID"
\`\`\`

---

## 6. Reproductor e Historial

**Obtener Estado del Reproductor**
\`\`\`bash
curl -X GET "http://127.0.0.1:3002/api/v1/player-state?user_id=USER_UUID"
\`\`\`

**Actualizar Estado del Reproductor**
\`\`\`bash
curl -X POST http://127.0.0.1:3002/api/v1/player-state \
-H "Content-Type: application/json" \
-d '{
  "user_id": "USER_UUID",
  "current_song_id": "SONG_UUID",
  "position_s": 45.5,
  "repeat": "all",
  "shuffle": true
}'
\`\`\`

**Ver Historial de Escucha (Listening History)**
\`\`\`bash
curl -X GET "http://127.0.0.1:3002/api/v1/listening-history?user_id=USER_UUID"
\`\`\`

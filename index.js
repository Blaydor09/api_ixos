const express = require('express');
const cors = require('cors');
require('dotenv').config();

const songsRoutes = require('./routes/songsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const playlistsRoutes = require('./routes/playlistsRoutes');
const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/catalogRoutes');
const artistsRoutes = require('./routes/artistsRoutes');
const moodsRoutes = require('./routes/moodsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const likedSongsRoutes = require('./routes/likedSongsRoutes');
const downloadsRoutes = require('./routes/downloadsRoutes');
const playerStateRoutes = require('./routes/playerStateRoutes');
const listeningHistoryRoutes = require('./routes/listeningHistoryRoutes');
const meRoutes = require('./routes/meRoutes');

const app = express();

const path = require('path');

// Middlewares
app.use(cors());
app.use(express.json());

// Servir archivos estáticos de la carpeta "music" de forma segura
app.use('/music', express.static(path.join(__dirname, 'music')));

// Routes v1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/catalog', catalogRoutes);
app.use('/api/v1/songs', songsRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/artists', artistsRoutes);
app.use('/api/v1/moods', moodsRoutes);
app.use('/api/v1/search', searchRoutes);
app.use('/api/v1/playlists', playlistsRoutes);
app.use('/api/v1/liked-songs', likedSongsRoutes);
app.use('/api/v1/downloads', downloadsRoutes);
app.use('/api/v1/player-state', playerStateRoutes);
app.use('/api/v1/listening-history', listeningHistoryRoutes);
app.use('/api/v1/me', meRoutes);

// Health check and root route
app.get('/health', (req, res) => {
  res.json({ service: 'Mood Music API', version: 'v1', status: 'ok' });
});

app.get('/', (req, res) => {
  res.send('IXOS API v1 is running...');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

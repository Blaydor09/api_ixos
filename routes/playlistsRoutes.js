const express = require('express');
const router = express.Router();
const playlistsController = require('../controllers/playlistsController');

router.get('/', playlistsController.getPublicPlaylists);
router.post('/', playlistsController.createPlaylist);
router.get('/:id/songs', playlistsController.getPlaylistSongs);

module.exports = router;

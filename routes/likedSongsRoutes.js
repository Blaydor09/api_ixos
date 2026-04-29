const express = require('express');
const router = express.Router();
const likedSongsController = require('../controllers/likedSongsController');

router.get('/', likedSongsController.getMyLikedSongs);

module.exports = router;

const express = require('express');
const router = express.Router();
const artistsController = require('../controllers/artistsController');

router.get('/', artistsController.getAllArtists);
router.get('/:id', artistsController.getArtistById);

module.exports = router;

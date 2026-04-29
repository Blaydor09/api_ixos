const express = require('express');
const router = express.Router();
const playerStateController = require('../controllers/playerStateController');

router.get('/', playerStateController.getPlayerState);
router.post('/', playerStateController.updatePlayerState);

module.exports = router;

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getAllUsers);
router.post('/', usersController.createUser);
router.get('/:id/liked-songs', usersController.getLikedSongs);

module.exports = router;

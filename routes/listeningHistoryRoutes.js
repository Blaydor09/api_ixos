const express = require('express');
const router = express.Router();
const listeningHistoryController = require('../controllers/listeningHistoryController');

router.get('/', listeningHistoryController.getListeningHistory);

module.exports = router;

const express = require('express');
const router = express.Router();
const downloadsController = require('../controllers/downloadsController');

router.get('/', downloadsController.getDownloads);

module.exports = router;

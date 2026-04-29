const express = require('express');
const router = express.Router();
const meController = require('../controllers/meController');

router.get('/', meController.getMe);

module.exports = router;

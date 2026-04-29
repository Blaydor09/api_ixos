const express = require('express');
const router = express.Router();
const moodsController = require('../controllers/moodsController');

router.get('/', moodsController.getMoods);

module.exports = router;

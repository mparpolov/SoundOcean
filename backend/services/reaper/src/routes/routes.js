const express = require('express');

const router = express.Router();

const ExtractController = require('../controllers/ExtractController');

router.post('/extract', ExtractController.extract);

module.exports = router;
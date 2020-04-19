const express = require('express');

const router = express.Router();

const SongController = require('../controllers/SongController');
const SongsController = require('../controllers/SongsController');
const SessionController = require('../controllers/SessionController');

router.post('/sessions', SessionController.create);
router.get('/songs', SongsController.index);

router.get('/song/:id', SongController.index);

module.exports = router;
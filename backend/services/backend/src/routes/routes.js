const express = require('express');

const router = express.Router();

const SongController = require('../controllers/SongController');
const SongsController = require('../controllers/SongsController');
const SessionController = require('../controllers/SessionController');
const AlbumController = require('../controllers/AlbumController');
const AlbumsController = require('../controllers/AlbumsController');

router.post('/sessions', SessionController.create);

router.get('/songs', SongsController.index);

router.get('/song/:id', SongController.index);
router.post('/song', SongController.create);

router.get('/albums', AlbumsController.index);

router.get('/abum/:id', AlbumController.index);

module.exports = router;
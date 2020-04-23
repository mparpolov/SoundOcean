const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/SoundOcean';

const Album = require('../models/album');

const AlbumsController = {
  index: async (req, res) => {
    await mongoose.connect(url, { useNewUrlParser: true });
    const albums = await Album.find({});
    res.json(albums);

    mongoose.connection.close();
  }
};

module.exports = AlbumsController;
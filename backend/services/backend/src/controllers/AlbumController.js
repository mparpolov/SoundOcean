const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/SoundOcean';

const _ = require('lodash');

const Album = require('../models/album');

const AlbumController = {
  index: async (req, res) => {
    const { id } = req.params;
    await mongoose.connect(url, { useNewUrlParser: true });
    const album = await Album.findOne({ _id: id });
    if ( !_.isEmpty(album) ) {
      res.json({ message: 'Could not find album' });
    } else {
      res.json(album);
    }
    mongoose.connection.close();
  }
};

module.exports = AlbumController;
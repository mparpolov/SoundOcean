const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/SoundOcean';

const _ = require('lodash');

const downloadImage = require('../util/downloadImage');

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
  },

  create: async (req, res) => {
    const { id } = req.params;
    const { imageUrl } = req.body;

    await mongoose.connect(url, { useNewUrlParser: true });
    const album = await Album.findOne({ _id: id }, 'title');
    if ( ! _.isEmpty(album) ) {
      await downloadImage(imageUrl, album.title);
      await Album.collection.update({ _id: album._id }, { 
        $set: { cover: `images/${album.title}` }
      });
      res.json({ message: 'Done.' });
    } else {
      res.json({ message: 'Album not found.' });
    }
    mongoose.connection.close();
  }
};

module.exports = AlbumController;
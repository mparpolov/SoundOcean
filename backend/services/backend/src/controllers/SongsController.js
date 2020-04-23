const mongoose = require('mongoose');
const url ='mongodb://mongo-server:27017/SoundOcean';

const Song = require('../models/song');

const SongsController = {
  index: async (req, res) => {
    await mongoose.connect(url, { useNewUrlParser: true });
    const songs = await Song.find({}, 'name');
    if ( songs ) {
      songs.sort((a, b) => a.name.localeCompare(b.name));
      res.json(songs);
    } else {
      res.status(503).json({ message: 'Failed to retrieve songs.' });
    }
    return mongoose.connection.close();
  }
};

module.exports = SongsController;
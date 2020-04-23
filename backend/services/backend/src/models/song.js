const mongoose = require('mongoose');

const Song = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  album: mongoose.Types.ObjectId,
  name: String,
  path: String
});

module.exports = mongoose.model('Song', Song);
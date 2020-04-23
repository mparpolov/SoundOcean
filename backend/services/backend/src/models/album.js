const mongoose = require('mongoose');

const Album = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  artist: String,
  title: String
});

module.exports = mongoose.model('Album', Album);
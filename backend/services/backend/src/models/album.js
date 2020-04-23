const mongoose = require('mongoose');

const Album = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  author: String,
  title: String
});

module.exports = mongoose.model('Album', Album);
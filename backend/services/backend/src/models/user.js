const mongoose = require('mongoose');

const User = mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  name: String,
  password: String,
  email: String 
});

module.exports = mongoose.model('User', User);


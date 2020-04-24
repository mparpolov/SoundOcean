const crypto = require('crypto');
const _ = require('lodash');

const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/SoundOcean';

const User = require('../models/user');

const SessionController = {
  create: async (req, res) => {
    const { name, password } = req.body;

    await mongoose.connect(url, { useNewUrlParser: true });
    const user = await User.findOne({
      name: name,
      password: crypto.createHash('sha256').update(password).digest('base64')
    }, '_id'); 
    if ( ! _.isEmpty(user) ) {
      res.json({ id: user._id });
    } else {
      res.status(400).json({ message: 'Incorrect username or password' });
    }
    return mongoose.connection.close();
  }
};

module.exports = SessionController;
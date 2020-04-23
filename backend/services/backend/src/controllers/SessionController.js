const crypto = require('crypto');

const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/SoundOcean';

const User = require('../models/user');

const SessionController = {
  create: async (req, res) => {
    const { name, password } = req.body;

    await mongoose.connect(url, { useNewUrlParser: true });
    const user = await User.find({
      name: name,
      password: crypto.createHash('sha256').update(password).digest('base64')
    }, '_id'); 
    if ( user.length > 0 ) {
      res.json({ id: user[0]._id });
    } else {
      res.status(400).json({ message: 'Incorrect username or password' });
    }
    return mongoose.connection.close();
  }
};

module.exports = SessionController;
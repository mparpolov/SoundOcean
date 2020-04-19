const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const url ='mongodb://mongo-server:27017/SoundOcean';

const Song = require('../models/song');
const User = require('../models/user');

const setupDB = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  // Create Song collection and insert initial data
  if ( ! await Song.exists() ) {
    await Song.createCollection();
    // Insert available songs into collection
    const songs = [];
    for ( let song of (await fs.readdirSync(path.join(__dirname, '../', 'assets/music'))) ) {
      songs.push({
        name: song,
        path: path.join(__dirname, '../', 'assets/music')
      });
    }
    Song.collection.insertMany(songs);
  }
  // Create User collection and insert initial data
  if ( ! await User.exists() ) {
    await User.createCollection();
    const users = require('./data/users');
    if ( users ) {   
      User.collection.insertMany(users);
    }
  }
  mongoose.connection.close();
};

module.exports = setupDB;
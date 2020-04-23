const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const url ='mongodb://mongo-server:27017/SoundOcean';

const Song = require('../models/song');
const User = require('../models/user');
const Album = require('../models/album')

const setupDB = async () => {
  await mongoose.connect(url, { useNewUrlParser: true });
  // Create Album collection
  if ( ! await Album.exists() ) {
    await Album.createCollection();
  }
  // Create Song collection and insert initial data
  if ( ! await Song.exists() ) {
    await Song.createCollection();
    // Insert available songs into collection
    const songs = [];
    for ( let song of (await fs.readdirSync(path.join(path.dirname(process.mainModule.filename), '../', 'music'))) ) {
      songs.push({
        name: song,
        album: null,
        path: path.join(path.dirname(process.mainModule.filename), '../', 'music')
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
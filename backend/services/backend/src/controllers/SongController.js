const fs = require('fs');
const path = require('path');

const axios = require('axios');
const _ = require('lodash');
const mongoose = require('mongoose');
const url = 'mongodb://mongo-server:27017/SoundOcean';

const Song = require('../models/song');
const Album = require('../models/album');
const { api } = require('../constants/config');

const SongController = {
  index: async (req, res) => {
    const { id } = req.params;
    await mongoose.connect(url, { useNewUrlParser: true });
    const song = await Song.find({ _id: id });
    if ( song.length > 0 ) {
      // Send mp3 file
      const { name, path } = song[0];
      const filePath = `${path}/${name}`;

      const size = fs.statSync(filePath).size;
      res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': size
      });;
      // Pipe file to response
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
    } else {
      res.status(400).json({ message: 'Song not found.' });
    }
    mongoose.connection.close();
  },

  create: async (req, res) => {
    const { videoID, name, artist, albumTitle } = req.body;
    try {
      await axios.post(api.url + '/extract', {
        videoID: videoID,
        name: name,
        artist: artist
      });

      await mongoose.connect(url, { useNewUrlParser: true });

      const album = {
        artist: artist,
        title: albumTitle
      };

      // Check if album already exist in db
      let albumInfo = await Album.findOne(album);
      if ( _.isEmpty(albumInfo) ) {
        albumInfo = await Album.collection.insert(album);
        albumInfo = albumInfo.ops[0]; // Extract _id from result
      }

      const song = {
        name: `${name}.mp3`,
        album: albumInfo._id, // Album id
        path: path.join(path.dirname(process.mainModule.filename), '../', 'music')
      }

      // Check if song already exist in db
      let songInfo = await Song.findOne(song);
      if ( _.isEmpty(songInfo) ) {
        songInfo = await Song.collection.insert(song);
        res.json(songInfo);
      } else {
        es.json({ message: 'Song already on database' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
    mongoose.connection.close();
  }
};

module.exports = SongController;
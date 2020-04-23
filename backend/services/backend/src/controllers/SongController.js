const fs = require('fs');

const mongoose = require('mongoose');
const url = "mongodb://mongo-server:27017/SoundOcean";

const Song = require('../models/song');

const SongController = {
  index: async (req, res) => {
    const { id } = req.params;
    await mongoose.connect(url, { useNewUrlParser: true });
    const song = await Song.find({ _id: id });
    console.log(song);
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
  }
}

module.exports = SongController;
const fs = require('fs');

const youtubedl = require('youtube-dl');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);

const ExtractController = {
  extract: (req, res) => {
    const { 
      videoID,
      name,
      artist
    } = req.body;

    const video = youtubedl(`https://www.youtube.com/watch?v=${videoID}`,
      // Optional arguments passed to youtube-dl.
      ['--format=251'],
      { cwd: __dirname });
    
    // Will be called when the download starts.
    // video.on('info', info => {
    //   console.log('Download started')
    //   console.log('filename: ' + info._filename)
    //   console.log('size: ' + info.size)
    // });
    
    video.pipe(fs.createWriteStream(`${name}.webm`));

    // Download completed
    video.on('end', async () => {
      console.log('completed');
      convert(`./${name}.webm`, `./music/${name}.mp3`, err => {
        if(!err) console.log('conversion complete');
        fs.unlinkSync(`./${name}.webm`);
        res.send({ message: 'Success.'});
      });
    });

    const convert = (input, output, callback) => {
        ffmpeg(input)
          .toFormat('mp3')
          .output(output)
          .addOutputOptions('-write_xing 0') // Fix song duration
          .addOutputOptions('-metadata', `title=${name}`)
          .addOutputOptions('-metadata', `artist=${artist}`)
          .on('end', function() {                    
              console.log('conversion ended');
              callback(null);
          }).on('error', function(err){
              console.log(err);
              callback(err);
          }).run();
    }
  }
};

module.exports = ExtractController;
const fs = require('fs');  
const path = require('path');  
const axios = require('axios');

const downloadImage = async (url, name) => {
  const basePath = path.dirname(process.mainModule.filename);
  const savePath = path.join(basePath, '../', 'public', 'images', `${name}`);
  const writer = fs.createWriteStream(savePath);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream'
  })

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve());
    writer.on('error', reject());
  })
}

module.exports = downloadImage;
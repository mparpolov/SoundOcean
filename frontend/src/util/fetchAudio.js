const fetchAudio = async id => {
  let url = `http://192.168.0.8:3001/song/${id}`;
  // fetch() returns a promise that
  // resolves once headers have been received
  return fetch(url)
    .then( async res => {
      if (!res.ok)
        throw new Error(`${res.status} = ${res.statusText}`);
      // response.body is a readable stream.
      // Calling getReader() gives us exclusive access to
      // the stream's content
      var reader = res.body.getReader();
      const contentLength = res.headers.get('Content-Length');
      console.log(contentLength);
      // read() returns a promise that resolves
      // when a value has been received
      let chunks = []; // array of received binary chunks (comprises the body)
      while(true) {
        const {done, value} = await reader.read();
        if (done) break;
        chunks.push(value);
      }
      // response.value for fetch streams is a Uint8Array
      const blob = new Blob(chunks, { type: 'audio/mp3' });
      const url = window.URL.createObjectURL(blob)
      const audio = new Audio();
      audio.src = url;
      // Get audio file metadata
      return new Promise((resolve, reject) => {
        audio.addEventListener('loadedmetadata', () => {
          if ( audio.duration ) {
            window.audio = audio;
            resolve(audio.duration);
          } else {
            reject(new Error('Could not read files duration.'));
          }
        });
      });
    });
}

export default fetchAudio; 
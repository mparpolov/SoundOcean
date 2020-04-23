import React from 'react';

import Song from '../components/Song';

import '../styles/playlist.css';

const Playlist = props => {

  return (
    <div className="playlist-panel">
      <h1>Sound Ocean</h1>
      <h2>Playlist</h2>
      <section className="playlist-container">
        {props.songs.map(song => <Song key={song._id} name={song.name.replace(/\.mp3/g, '')} id={song._id} />)}
      </section>
    </div>
  );
};

export default Playlist;
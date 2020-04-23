import React, { useState, useEffect, useContext } from 'react';

import Song from '../components/Song';

import { Context } from '../store/Store';

import '../styles/playlist.css';

const Playlist = props => {
  const [state, dispatch] = useContext(Context);
  const [playlist, setPlaylist] = useState([]);

  useEffect(() => {
    const { tracks, albums, albumID } = state;
    // Get album tracks
    if ( tracks && albums ) {
      const album = albums.filter(album => album._id === albumID );
      const playlist = tracks.filter(track => track.album === albumID);
      setPlaylist(playlist);
    }
  }, [state.albumID]);

  return (
    <div className="playlist-panel">
      <h1>Sound Ocean</h1>
      <h2>Playlist</h2>
      <section className="playlist-container">
        {playlist.map(song => <Song key={song._id} name={song.name.replace(/\.mp3/g, '')} id={song._id} />)}
      </section>
    </div>
  );
};

export default Playlist;
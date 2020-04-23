import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/Store';

import Nav from './Nav';
import Player from './Player';
import Album from './Album';

import albumArtMissingImage from '../assets/album-art-missing.png';

import '../styles/filler.css';

const Filler = props => {
  const [state, dispatch] = useContext(Context);
  const [visible, setVisible] = useState(false);
  const [trackName, setTrackName] = useState('');
  const [artist, setArtist] = useState('');

  useEffect(() => {
    if ( state.playing && state.trackName && state.albumArtist ) {
      setVisible(true);
      setTrackName(state.trackName);
      setArtist(state.albumArtist);
    } else {
      setVisible(false);
    }
  }, [state.playing]);

  return (
    <div className="panel">
      <Nav />
      <section className={`now-playing-container ${visible ? 'visible' : 'hidden'}`}>
        <span>Now Playing</span>
        <h1>
          <span className="highlight">{trackName}</span> by <span className="highlight">{artist}</span>
        </h1>
      </section>
      <section className="albums-panel">
        {props.albums.map(album => {
          return (
            <Album 
              key={album._id}
              id={album._id}
              title={album.title}
              artist={album.artist}
              coverArt={albumArtMissingImage}/>
          );
        })}
      </section>
      <Player />
    </div>
  );
};

export default Filler;
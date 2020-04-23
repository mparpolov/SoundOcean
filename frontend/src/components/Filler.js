import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/Store';

import Nav from './Nav';
import Player from './Player';
import Album from './Album';

import albumArtMissingImage from '../assets/album-art-missing.png';

import '../styles/filler.css';

const Filler = props => {
  const [state, dispatch] = useContext(Context);
  const [info, setInfo] = useState('');

  useEffect(() => {
    if ( state.trackName ) {
      // setInfo(`${state.trackName} by ${state.albumName}`);
      setInfo(
        <>
          <span>Now Playing</span>
          <h1>
            {state.trackName} by <span className="text-highlight">{state.albumArtist}</span>
          </h1>
        </>
      );
    }
  }, [state.trackName]);

  return (
    <div className="panel">
      <Nav />
      <section className="now-playing-container">
        {info}
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
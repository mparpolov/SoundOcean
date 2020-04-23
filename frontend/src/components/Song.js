import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/Store';

import { BsDot } from 'react-icons/bs';
import { IoIosMusicalNote } from 'react-icons/io';

import fetchAudio from '../util/fetchAudio';

import '../styles/song.css';

const Song = props => {
  const [state, dispatch] = useContext(Context);
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    const { name } = props;
    if ( name === state.trackName ) {
      setHighlight(true); // Highlight playing track
    } else { // Track changed
      setHighlight(false);
    }
  }, [state.trackName]);

  const play = async () => {
    const { name } = props;

    if ( !state.playing ) {
      await loadAudio();
      dispatch({ type: 'PLAY_FROM_BEGINNING' });
      setHighlight(true); // Highlight playing track
      window.audio.play();

    } else if ( state.playing && name === state.trackName ) {
      pause();

    } else if ( name !== state.trackName ) {
      pause();
      await loadAudio();
      dispatch({ type: 'PLAY_FROM_BEGINNING' });
      window.audio.currentTime = 0;
      window.audio.play();
    }
  }

  const loadAudio = async () => {
    return new Promise (async (resolve, reject) => {
      try {
        const { id, name } = props;

        const duration = await fetchAudio(id); // Audio element setup
        dispatch({ type: 'SET_TRACK_METADATA', payload: {
          name: name,
          duration: duration
        }});
        return resolve();
      } catch (err) {
        console.log(err);
        dispatch({ type: 'SET_ERROR', payload: 'Could not play song'});
        return reject();
      }
    });
  }

  const pause = () => {
    window.audio.pause();
    dispatch({ type: 'PAUSE', payload: 0 });
    setHighlight(false);
  }

  return (
    <div 
      className={`song-container ${highlight ? 'highlight' : ''}`}
      onClick={play}
    >
      <p><IoIosMusicalNote />{props.name}</p>
      <div className="song-info">
        <span>Some Artist</span> 
        <BsDot />
        <span>Some Album</span>
      </div>
    </div>
  );
};

export default Song;
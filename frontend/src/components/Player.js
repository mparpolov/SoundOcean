import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/Store';

import moment from 'moment';

import { 
  IoIosPlay,
  IoIosPause
 } from 'react-icons/io';
 import { MdStop } from 'react-icons/md';
 import { MdVolumeUp } from 'react-icons/md';

import '../styles/player.css';

const Player = props => {
  const [state, dispatch] = useContext(Context);
  const [seconds, setSeconds]= useState(0);

  useEffect(() => {
    setSeconds(state.currentTime);
    let intervalHandler;
    if ( state.playing ) {
      intervalHandler = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else {
      clearInterval(intervalHandler);
    }
    return () => {
      clearInterval(intervalHandler);
    }
  }, [state.playing]);

  const play = () => {
    if ( !state.playing && state.trackName ) {
      dispatch({ type: 'PLAY' });
      window.audio.play();
    }
  }

  const pause = () => {
    if ( state.playing && state.trackName ) {
      dispatch({ type: 'PAUSE', payload: window.audio.currentTime });
      window.audio.pause();
    }
  }

  const stop = () => {
    if ( state.trackName ) {
      window.audio.pause();
      dispatch({ type: 'PAUSE', payload: 0 });
      window.audio.currentTime = 0;
      setSeconds(0);
    }
  }

  return (
    <section className="player-container">
      <div className="audio-controls">
        <button
          onClick={pause}
        >
          <IoIosPause />
        </button>
        <button
          onClick={play}
        >
          <IoIosPlay />
        </button>
        <button
          onClick={stop}
        >
          <MdStop />
        </button>
      </div>

      <div className="seeker-container">
        <span>
          {moment(seconds * 1000).format('mm:ss')}
        </span>
        <div className="seeker-bar-container">
          <div className="seeker-bar-overlay" style={{ width: `${(seconds / state.duration) * 100}%`}}></div>
          <div className="seeker-bar"></div>
        </div>
        <span>{moment(state.duration * 1000).format('mm:ss')}</span>
      </div>

      <div className="volume-container">
        <MdVolumeUp />
        <div className="volume-bar-container">
          <div className="volume-bar-overlay"></div>
          <div className="volume-bar"></div>
        </div>
      </div>
    </section>
  );
};

export default Player;
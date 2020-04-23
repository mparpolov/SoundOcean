import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import Playlist from '../../components/Playlist';
import Filler from '../../components/Filler';

import { Context } from '../../store/Store';

import './styles.css';

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.8:3001/songs')
      .then(res => {
        dispatch({ type: 'SET_TRACKS_LIST', payload: res.data });
        setSongs(res.data);
      });
    axios.get('http://192.168.0.8:3001/albums')
      .then(res => {
        dispatch({ type: 'SET_ALBUMS_LIST', payload: res.data });
        setAlbums(res.data);
      })
  }, []);

  return (
    <div className="page">
      <Playlist songs={songs} />
      <Filler albums={albums} />
    </div>
  );
};

export default Home;


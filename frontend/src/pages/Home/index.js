import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Playlist from '../../components/Playlist';
import Filler from '../../components/Filler';

import './styles.css';

const Home = () => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    axios.get('http://192.168.0.8:3001/songs')
      .then(res => {
        setSongs(res.data);
      });
  }, []);

  return (
    <div className="page">
      <Playlist songs={songs}/>
      <Filler />
    </div>
  );
};

export default Home;


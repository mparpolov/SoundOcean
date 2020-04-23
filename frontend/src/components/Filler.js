import React from 'react';

import Nav from './Nav';
import Player from './Player';
import Album from './Album';

import image from '../assets/high-hopes.jpg';

import '../styles/filler.css';

const Filler = () => {
  return (
    <div className="panel">
      <Nav />
      <section className="albums-panel">
        <Album cover={image}/>
        <Album cover={image}/>
        <Album cover={image}/>
        <Album cover={image}/>

        <Album cover={image}/>
        <Album cover={image}/>
        <Album cover={image}/>
        <Album cover={image}/>
      </section>
      <Player />
    </div>
  );
};

export default Filler;
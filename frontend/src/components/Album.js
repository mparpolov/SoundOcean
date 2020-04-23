import React from 'react';

import '../styles/album.css';

const Album = props => {
  return (
    <div className="album-container">
      <img src={props.cover} />
      <div className="album-info-container">
        <span className="artist">Artist Name</span>
        <span>Album Name</span>
      </div>
    </div>
  )
};

export default Album;
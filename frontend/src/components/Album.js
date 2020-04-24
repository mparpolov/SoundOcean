import React, { useContext, useState } from 'react';

import { Context } from '../store/Store';

import albumArtMissingImage from '../assets/album-art-missing.png';

import '../styles/album.css';

const Album = props => {
  const [state, dispatch] = useContext(Context);
  const [coverArt, setCoverArt] = useState(`http://192.168.0.8:3001/${props.coverArt}`);

  const choseAlbum = () => {
    const { title, artist, id } = props;
    dispatch({ type: 'SET_ALBUM_METADATA', payload: {
      title: title,
      artist: artist,
      albumID: id
    }});
  }

  const switchToDefaultImage = e => {
    setCoverArt(albumArtMissingImage); 
  }

  return (
    <div className="album-container">
      <img 
        src={coverArt}
        onClick={choseAlbum}
        onError={switchToDefaultImage}
      />
      <div className="album-info-container">
        <span className="artist">{props.artist}</span>
        <span>{props.title}</span>
      </div>
    </div>
  )
};

export default Album;
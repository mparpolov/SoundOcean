import React, { useContext } from 'react';

import { Context } from '../store/Store';

import '../styles/album.css';

const Album = props => {
  const [state, dispatch] = useContext(Context);

  const choseAlbum = () => {
    const { title, artist, id } = props;
    dispatch({ type: 'SET_ALBUM_METADATA', payload: {
      title: title,
      artist: artist,
      albumID: id
    }});
  }

  return (
    <div className="album-container">
      <img 
        src={props.coverArt}
        onClick={choseAlbum}
      />
      <div className="album-info-container">
        <span className="artist">{props.artist}</span>
        <span>{props.title}</span>
      </div>
    </div>
  )
};

export default Album;
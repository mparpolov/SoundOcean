import React, { createContext, useReducer } from 'react';
import Reducer from '../reducers/Reducer';

const initialState = {
  playing: false,
  trackName: null,
  albumName: null,
  albumID: null,
  duration: 0,
  currentTime: 0,
  albums: [],
  tracks: [],
  error: null
};

const Store = ({children}) => {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <Context.Provider value={[state, dispatch]}>
      {children}
    </Context.Provider>
  )
};

export const Context = createContext(initialState);
export { initialState };
export default Store;
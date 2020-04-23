import React, { createContext, useReducer } from 'react';
import Reducer from '../reducers/Reducer';

const initialState = {
  playing: false,
  trackName: null,
  duration: 0,
  currentTime: 0, 
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
export default Store;
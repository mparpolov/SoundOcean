import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { GoSearch } from 'react-icons/go';

import { Context } from '../store/Store';

import '../styles/nav.css';

const Nav = () => {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();

  const logout = () => {
    if ( state.playing ) {
      window.audio.pause();
    }
    dispatch({ type: 'USER_LOGOUT' });
    localStorage.clear();
    history.push('/');
  }

  return (
    <header>
      <nav>
        <ul>
          <li>RADIO</li>
          <li className="search-bar">
            <GoSearch />
            <input type="text" name="search" />
          </li>
          <li>
            <button onClick={logout}>
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
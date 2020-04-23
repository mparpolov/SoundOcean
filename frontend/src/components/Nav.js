import React from 'react';
import { GoSearch } from 'react-icons/go';

import '../styles/nav.css';

const Nav = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>RADIO</li>
          <li className="search-bar">
            <GoSearch />
            <input type="text" name="search" />
          </li>
          <li>Logout</li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
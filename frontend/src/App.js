import React from 'react';

import Store from './store/Store';
import Routes from './routes';

import './global.css';

function App() {
  return (
    <div>
      <Store>
        <Routes />
      </Store>
    </div>
  );
}

export default App;

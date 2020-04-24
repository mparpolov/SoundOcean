import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import axios from 'axios';

import './styles.css';

const Logon = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();
  
  const login = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://192.168.0.8:3001/sessions', {
        name: user,
        password: password
      });
      localStorage.setItem('userId', res.data.id);
      history.push('/home');
    } catch (err) {
      alert(err.message);
    }
  }
  
  return (
    <section className="logon-container">
      <form className="logon-form">
        <input 
          type="text" 
          placeholder="User"
          value={user}
          onChange={e => setUser(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={login}>Login</button>
      </form>
    </section>
  );
};

export default Logon;
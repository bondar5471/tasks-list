import React from 'react';

import './app-header.css';
import {Link} from 'react-router-dom'

const Header = () => {
  return (
    <div className="header d-flex">
      <h1>
      <Link to="/">Diary</Link>
      </h1>
      <ul className="d-flex">
        <li>
          <Link to="/days">Days</Link>
        </li>
        <li>
        <Link to="/tasks">Tasks</Link>
        </li>
      </ul>
      <ul className="auth-user d-flex">
        <li>
          < Link to="/login">Login</Link>
        </li>
        <li>
          <button
            className="btn btn-danger logout"
            onClick={() => localStorage.removeItem('token')}>
          Exit</button>
        </li>
      </ul>
    </div>
    
  );
};

export default Header;
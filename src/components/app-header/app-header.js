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
         <Link to="/tasks">Tasks</Link>
        </li>
        <li>
          <Link to="/boards">Boards</Link>
        </li>
      </ul>
      <ul className="auth-user d-flex">
        <li
            className={localStorage.getItem("token") !== null ? 'logOutHide' : ''}>
          < Link to="/login">Login</Link>
        </li>
        {/*<li>*/}
            {/*<Link to="/google_auth">Google auth</Link>*/}
        {/*</li>*/}
        <li>
          <button
            className={localStorage.getItem("token") !== null ? "btn btn-danger logout" : "logOutHide"}
            onClick={() => localStorage.removeItem('token')}>
          Exit</button>
        </li>
      </ul>
    </div>
    
  );
};

export default Header;
import React, { Component } from "react";
import "./app-header.css";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { history } from '../../helpers/history';
import { logoutUser } from '../../actions';

class Header extends Component {
  logout = () => {
    this.props.logoutUser();
    history.push('/login');
    window.location.reload()
  };

  render() {
    return (
      <div className="header d-flex">
        <h1>
          <Link to="/">Diary</Link>
        </h1>
        <ul className="d-flex">
          <li>
            <Link to="/boards">Boards</Link>
          </li>
        </ul>
        <ul className="auth-user d-flex">
          <li
            className={
              localStorage.getItem("token") !== null ? "logOutHide" : ""
            }
          >
            <Link to="/login">Login</Link>
          </li>
          <li>
            <button
              className={
                this.props.token !== null
                  ? "btn btn-danger logout"
                  : "logOutHide"
              }
              onClick={() => {
                if (window.confirm("You are now signed out ?"))
                  this.logout();
              }}
            >
              Exit
            </button>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {token : user.token}
}

export default connect(mapStateToProps, { logoutUser })(Header);

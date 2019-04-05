import React, { Component } from "react";
import "./app-header.css";
import { Link } from "react-router-dom";

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.removeToken = this.removeToken.bind(this);
  }

  removeToken() {
    localStorage.removeItem("token");
    window.location.reload();
  }
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
                localStorage.getItem("token") !== null
                  ? "btn btn-danger logout"
                  : "logOutHide"
              }
              onClick={() => {
                if (window.confirm("You are now signed out ?"))
                  this.removeToken();
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

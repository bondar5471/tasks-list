import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import axios from "axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      data: {
        user: {
          email: "",
          jwt: ""
        }
      }
    };
  }

  handleSubmit = async event => {
    const { history } = this.props;
    event.preventDefault();
    const data = { password: this.state.password, email: this.state.email };
    await axios
      .post("http://localhost:3000/api/v1/sessions", data)
      .then(function(response) {
        const user = response.data;
        console.log(user);
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          alert("Invalid password or email");
        }
      });

    const auth = {
      auth: {
        email: this.state.email,
        password: this.state.password
      }
    };
    await axios
      .post("http://localhost:3000/user_token", auth)
      .then(function(res) {
        const token = res.data.jwt;
        localStorage.setItem("token", token);
        history.push("/");
      });
  };

  validateForm() {
    const email = this.state.email;
    const password = this.state.password;
    return email.length > 0 && password.length > 0;
  }

  setEmail = e => {
    this.setState({ email: e.target.value });
  };

  setPassword = e => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup>
            <label>Email</label>
            <FormControl
              autoFocus
              id="authEmail"
              type="email"
              placeholder="Email"
              onChange={this.setEmail}
            />
          </FormGroup>
          <FormGroup>
            <label>Password</label>
            <FormControl
              id="authPassword"
              type="password"
              placeholder="Password"
              onChange={this.setPassword}
            />
          </FormGroup>
          <Button block disabled={!this.validateForm()} type="submit">
            Login
          </Button>
          <Link to="/sign_up" className="link-login">
            Don't have account?
          </Link>
        </form>
      </div>
    );
  }
}

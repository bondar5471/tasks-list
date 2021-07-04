import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import "./login.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logInUser } from "../../actions";

class Login extends Component {
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
    event.preventDefault();
    const data = { password: this.state.password, email: this.state.email };
    this.props.logInUser(data);
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
    if (this.props.token) return <Redirect to='/' />;
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

const mapStateToProps = ({ user }) => {
  return { user: user.key, token: user.token };
};

export default connect(
  mapStateToProps,
  {
    logInUser
  }
)(Login);
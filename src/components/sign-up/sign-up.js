import React from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import {Link, Redirect} from "react-router-dom";
import { connect } from "react-redux";
import { signUpUser } from "../../actions";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordConfirmation: "",
      data: {
        user: {
          email: "",
          password: "",
          passwordConfirmation: ""
        }
      }
    };
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setUser();
    const data = {
      user: {
        email: this.state.email,
        password: this.state.password,
        password_confirmation: this.state.passwordConfirmation
      }
    };
    this.props.signUpUser(data)
  };

  validateForm() {
    const email = this.state.email;
    const password = this.state.password;
    const passwordConfirmation = this.state.passwordConfirmation;
    return (
      email.length > 0 &&
      password.length > 0 &&
      password === passwordConfirmation
    );
  }
  setPasswordConfirmation = e => {
    this.setState({ passwordConfirmation: e.target.value });
  };
  setEmail = e => {
    this.setState({ email: e.target.value });
  };

  setPassword = e => {
    this.setState({ password: e.target.value });
  };

  setUser() {
    this.setState({
      user: {
        email: this.state.email,
        password: this.state.password,
        passwordConfirmation: this.state.passwordConfirmation
      }
    });
  }

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
              placeholder="Email addres"
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
          <FormGroup>
            <label>Password confirmation</label>
            <FormControl
              id="authPasswordConfirmation"
              type="password"
              placeholder="Password confirmation"
              onChange={this.setPasswordConfirmation}
            />
          </FormGroup>
          <Button block disabled={!this.validateForm()} type="submit">
            Sign Up
          </Button>
          <Link to="/login" className="link-login">
            Want to login
          </Link>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user: user.key , token: user.token};
};

export default connect(
  mapStateToProps,
  {
    signUpUser
  }
)(SignUp);
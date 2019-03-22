import React from 'react'
import { Button, FormGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import Axios from 'axios'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      passwordConfirmation: '',
      data: {
        user: {
          email: '',
          password: '',
          passwordConfirmation: ''
        }
      }
    }
  }
  handleSubmit = event => {
    event.preventDefault();
    this.setUser();

    const data = { user: { email: this.state.email, 
                 password: this.state.password,  
                 password_confirmation: this.state.passwordConfirmation } }
    Axios.post('http://localhost:3000/api/users', data)
    .then((response) => {
      const auth = { auth: {
          email: response.data.email,
          password: this.state.password } }
      Axios.post('http://localhost:3000/user_token', auth)
        .then((res) => {
          const token = res.data.jwt
          localStorage.setItem('token', token)
          this.props.history.push('/')
        })
        .catch( () => {
          this.props.history.push('/sign_up')
        })
    }).catch(function (error){
      if (error.response && error.response.status === 422) {
        alert('No correct data')
      }
    })

  }

  validateForm() {

    const email = this.state.email
    const password = this.state.password
    const passwordConfirmation = this.state.passwordConfirmation
    return email.length > 0 && 
    password.length > 0 &&
    password === passwordConfirmation
  }
  setPasswordConfirmation = (e) => {
    this.setState({ passwordConfirmation: e.target.value })
    
  }
  setEmail = (e) => {
    this.setState({ email: e.target.value })
  } 

  setPassword = (e) => {
    this.setState({ password: e.target.value })
  }

  setUser() {
    this.setState({ user: { email: this.state.email, password: this.state.password, passwordConfirmation: this.state.passwordConfirmation } })
  }

render(){

  return(
      <div className="Login">
          <form onSubmit={ this.handleSubmit }>
              <FormGroup>
                  <label>Email</label>
                  <FormControl
              autoFocus
              id="authEmail"
              type="email"
              placeholder="Email addres"
              onChange={ this.setEmail }/>
              </FormGroup>
              <FormGroup >
                  <label>Password</label>
                  <FormControl
              id="authPassword"
              type="password"
              placeholder="Password"
              onChange={ this.setPassword } />
              </FormGroup>
              <FormGroup >
                  <label>Password confirmation</label>
                  <FormControl
              id="authPasswordConfirmation"
              type="password"
              placeholder="Password confirmation"
              onChange={ this.setPasswordConfirmation } />
              </FormGroup>
              <Button
            block
            disabled={ !this.validateForm() }
            type="submit">
            Sign Up
              </Button>
              <Link to="/login"
              className="link-login">
          Want to login</Link>
          </form>
      </div>
  )
}  
}

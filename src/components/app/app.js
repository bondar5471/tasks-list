import React, { Component } from 'react';
import TaskList from '../task-list'
import DaysContainer from '../days-container'
import ErrorBoundtry from '../error-boundtry'
import Header from '../app-header'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from '../login'
import SignUp from '../sign-up'
import jwtDecode from 'jwt-decode'
import Boards from '../boards'
import './app.css';


export default class App extends Component {
  state = {
    userId: "",
    userEmail: ""
  }
  

  componentDidMount() {
    const jwt = localStorage.getItem("token")
    if (jwt !== null){
      const user = jwtDecode(jwt)
      console.log(jwt)
      this.setState({
        userId: user.sub,
        userEmail: user.email})}
    else
      return(<Login/>)  
  }
   
  render() {
    return (
      <div> 
        <ErrorBoundtry> 
            <Router>
              <div>
                <Header />
              <Switch>  
                <Route path="/" 
                render={()=> <h2> Welocome to Diary {this.state.userEmail}</h2>}
                exact/>
                <Route path="/login" exact component={Login} />
                <Route path="/sign_up" exact component={SignUp}/>
                <Route path="/days" component={DaysContainer} />
                <Route path="/tasks" component={TaskList} />
                <Route path="/boards" component={Boards} />
                <Redirect to="/" />
              </Switch>
              </div>
            </Router>
        </ErrorBoundtry>
      </div> 
    )
  }
};

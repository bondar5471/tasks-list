import React, { Component } from 'react';
import TaskList from '../task-list'
import DaysContainer from '../days-container'
import ErrorBoundtry from '../error-boundtry'
import Header from '../app-header'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import Login from '../login'
import SignUp from '../sign-up'
import jwtDecode from 'jwt-decode'
import './app.css';


export default class App extends Component {
  state = {}

  componentDidMount() {
    const jwt = localStorage.getItem("token")
    if(jwt !== undefined){
      const user = jwtDecode(jwt)
      return user}
    console.log(user)
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
                render={()=> <h2> Welocome to Diary</h2>}
                exact/>
                <Route path="/login" exact component={Login} />
                <Route path="/sign_up" exact component={SignUp}/>
                <Route path="/days" component={DaysContainer} />
                <Route path="/tasks" component={TaskList} />
                <Redirect to="/" />
              </Switch>
              </div>
            </Router>
         
        </ErrorBoundtry>
      </div> 
    )
  }
};

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
import ReactGoogleAuth from '../google-auth'
import {
  Accordion,
  AccordionItem,
  AccordionItemTitle,
  AccordionItemBody,
} from 'react-accessible-accordion';
import './app.css';
import 'react-accessible-accordion/dist/fancy-example.css';


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
                       render={()=> <h4> Welocome to Diary {this.state.userEmail}</h4>}
                       exact/>
                <Route path="/login" exact component={Login} />
                <Route path="/sign_up" exact component={SignUp}/>
                <Route path="/boards" component={Boards} />
                <Route path="/google_auth" component={ReactGoogleAuth}/>
                <Redirect to="/" />
              </Switch>
              </div>
            </Router>
        </ErrorBoundtry>
        <Accordion>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="accordion_title">Days</h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <DaysContainer/>
            </AccordionItemBody>
          </AccordionItem>
          <AccordionItem>
            <AccordionItemTitle>
              <h3 className="accordion_title">Tasks</h3>
            </AccordionItemTitle>
            <AccordionItemBody>
              <TaskList/>
            </AccordionItemBody>
          </AccordionItem>
        </Accordion>
      </div> 
    )
  }
};

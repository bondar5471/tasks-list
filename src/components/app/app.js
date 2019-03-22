import React, { Component } from 'react';
import TaskList from '../task-list'
import DaysContainer from '../days-container'
import ErrorBoundtry from '../error-boundtry'
import Header from '../app-header'
import { Route, Switch, Redirect } from 'react-router-dom'
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

export default class App extends Component {
  state = {
    userId: '',
    userEmail: ''
  }

  componentDidMount() {
    const jwt = localStorage.getItem('token')

    if (jwt == null){
      console.log('Login')}
    else {
      const user = jwtDecode(jwt)
      this.setState({
        userId: user.sub,
        userEmail: user.email })}
  }

  renderRoutes = () => {
    const jwt = localStorage.getItem('token')
    const routes = jwt ? <Switch>
        {jwt == null && <Redirect to="/login"/>}
        <Route path="/"
             render={ ()=>
                 <Accordion accordion={ false }>
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
                 </Accordion> }
             exact/>
        <Route path="/login" exact component={ Login } />
        <Route path="/sign_up" exact component={ SignUp }/>
        <Route path="/boards" component={ Boards } />
        <Route path="/google_auth" component={ ReactGoogleAuth }/>
        <Redirect to="/" />
    </Switch> :
    <Switch>
        <Route path="/login" exact component={ Login } />
        <Route path="/sign_up" exact component={ SignUp }/>
        <Redirect to="/login" />
    </Switch>
    return routes;
  };
   
  render() {
    return (
        <div> 
            <ErrorBoundtry>
                <div>
                    <Header />
                    {this.renderRoutes()}
                </div>
            </ErrorBoundtry>
        </div>
    )
  }
}

import React, { Component } from 'react';

import TaskList from '../task-list'
import FormAddTask from '../form-add-task'

import axios from 'axios'

import './app.css';

export default class App extends Component {
  
  constructor (props){
    super(props)
    this.state = {
      tasks: []
    }
    this.addNewTask = this.addNewTask.bind(this)
    
  }

  addNewTask(list, date_end, duration) {
    const id = 1
    axios.post(`http://localhost:3000/api/v1/days/${id}/tasks`,
              {task:{list, date_end, duration}})
         .then(response => {
           console.log(response)
           const task = [...this.state.tasks, response.data]
           this.setState({task})
         })
         .catch(error => {
           console.log(error)
         })
  }

  render() {
    return (
      <div>
        <TaskList onRemoveList={this.removeList}/>
        <FormAddTask onNewTask={this.addNewTask} />
      </div>)    
  }
};

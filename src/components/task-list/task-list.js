import React, {Component} from 'react'
import SearchPanel from '../search-panel'
import TaskDurationFilter from '../task-duration-filter'
import axios from 'axios'
import moment from 'moment'

import './task-list.css'

export default class TaskList extends Component {
  constructor (props){
    super(props)
    this.state = {
      tasks: [],
      term: '',
      filter: 'all'
    }
    this.removeTask = this.removeTask.bind(this)
  }
  
  removeTask(id) {
    const day = 1
    axios.delete(`http://localhost:3000/api/v1/days/${day}/tasks/`+ id)
    .then(response => {
      console.log(response)
      const tasks = this.state.tasks.filter(
        task => task.id !== id
      )
      this.setState({tasks})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    const id = 1;
    
    axios.get(`http://localhost:3000/api/v1/days/${id}/tasks`)
      .then(res => {
        const tasks = res.data;
        this.setState({tasks})
      })
  }

  search(tasks, term) {
    if(term.length === 0) {
      return tasks
    }
    return tasks.filter((task) =>{
      return task.list
       .toLowerCase()
       .indexOf(term.toLowerCase()) > -1
    })
  }
  onSearchChange = (term) => {
    this.setState({term})
  }
  onFilterChange = (filter) => {
    this.setState({filter})
  }

  filter(tasks, filter) {
    switch(filter) {
      case 'all':
        return tasks
      case 'day':
        return this.state.tasks.filter((task)=> task.duration === 'day');
      case 'week': 
        return this.state.tasks.filter((task)=> task.duration === 'week');
      case 'month': 
        return this.state.tasks.filter((task)=> task.duration === 'month'); 
      case 'year': 
        return this.state.tasks.filter((task)=> task.duration === 'year');
      default:
        return tasks       
    }
  }
  render() {
    const {tasks, term, filter} = this.state
    const visibleItem = this.filter(this.search(tasks, term),filter)
    console.log(visibleItem)
    return (
    <div>
       <TaskDurationFilter 
       filter={filter}
       onFilterChange={this.onFilterChange}/> 
      <SearchPanel 
        onSearchChange={this.onSearchChange}
      />
      {visibleItem.map(task => {
        return(
         <div key={task.id}>
          <li className="list-group-item" >{task.list},({task.duration})
            <span className="date-task">{moment(task.date_end).format("ll")}
            <button className="btm btn-danger"
                    onClick ={()=>this.removeTask(task.id) }
            ><i className="fa fa-trash"></i></button>
            </span>
          </li>
        </div>)
      })}
    </div>   
    )}
}

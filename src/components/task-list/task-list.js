import React, {Component} from 'react'
import SearchPanel from '../search-panel'
import TaskDurationFilter from '../task-duration-filter'
import FormAddTask from '../form-add-task'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import axios from 'axios'
import moment from 'moment'

import './task-list.css'

export default class TaskList extends Component {
  constructor (props){
    super(props)
    this.state = {
      days: [],
      tasks: [],
      term: '',
      filter: 'all',
      loading: true,
      error: false,
      dateTask: '' 
    }
    this.removeTask = this.removeTask.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
  }
  
  addNewTask(list, date_end, duration) { 
    const task = {task:{ list, date_end, duration}}
    const {days} = this.state
    let day_id
    const getDayId = days.forEach( day => {
      if (day.date === task.task.date_end) {
        day_id = day.id
      }
      return (day_id)
    })
    const id = day_id
    const token = localStorage.getItem("token")
    const config = {
    headers: {'Authorization': "bearer " + token}
    };
    
    axios.post(`http://localhost:3000/api/days/${id}/tasks`, task, config)
         .then(response => {
           const tasks = [...this.state.tasks, response.data]
           this.setState({tasks})
         })
         .catch(error => {
         })
  }
  
  removeTask(id) {
    const day = null
    const token = localStorage.getItem("token")

    const config = {
    headers: {'Authorization': "bearer " + token}
    };
    axios.delete(`http://localhost:3000/api/days/${day}/tasks/`+ id, config)
    .then(response => {
      const tasks = this.state.tasks.filter(
        task => task.id !== id
      )
      this.setState({tasks})
    })
    .catch(error => console.log(error))
  }

  componentDidMount() {
    const id = this.state.dayId;
    const token = localStorage.getItem("token")
    const config = {
    headers: {'Authorization': "bearer " + token}
    };
    console.log(config)
    axios.get(`http://localhost:3000/api/days/${id}/tasks`, config)
      .then(res => {
        const tasks = res.data;
        this.setState({tasks})
      })
        axios.get('http://localhost:3000/api/days', config)		
				.then(response => {
					console.log(config)
            this.setState({
								days: response.data
						})
        })
      
  }

  search(tasks, term, filter) {
    if(term.length === 0) {
      return tasks
    }
    return tasks.filter((task) =>{
      return task.list.toLowerCase()
       .indexOf(term.toLowerCase()) > -1
    })
  }

  onSearchChange = (term) => {
    this.setState({term})
  }

  onFilterChange = (filter) => {
    this.setState({filter})
    if (filter === "date") {
      document.getElementById('dateFilter').style.display = 'block'
    }
    else{
      document.getElementById('dateFilter').style.display = 'none'
    }
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
      case 'date': 
        return this.state.tasks.filter((task)=> task.date_end === this.state.dateTask);
      default:
        return tasks       
    }
  }
  onTaskLoaded = (tasks) => {
    this.setState({
      tasks,
      loading: false,
      error: false
    });
  };

  onError = (error) => {
    this.setState({
      error: true,
      loading: false
    });
  };
  setDate = (e) => {
    this.setState({dateTask: e.target.value})
  }

  render() {
    const {tasks, term, filter, loading, error} = this.state
    const spinner = !loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator/> : null;
    const visibleItem = this.search(this.filter(tasks, filter),term)
    return (
    <div>
       <TaskDurationFilter 
       filter={filter}
       onFilterChange={this.onFilterChange}/> 
      <SearchPanel 
        onSearchChange={this.onSearchChange}
      />
       <label>Select date to search</label>
       <input type="date"
                id="dateFilter"
                onChange={this.setDate}
                className="form-control dateFilter"/>
      {spinner}
      {errorMessage}
      {visibleItem.map(task => {
        return(
         <div key={task.id}>
          <li className="list-group-item" >{task.list}
            <span className="date-task">{moment(task.date_end).format("ll")}
            <button className="btm btn-danger"
                    onClick ={()=>this.removeTask(task.id) }
            ><i className="fa fa-trash"></i></button>
            </span>
          </li>
        </div>)
      })}
        <FormAddTask onNewTask={this.addNewTask} />
    </div>   
    )}
}

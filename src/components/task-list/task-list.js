import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

import './task-list.css'

export default class TaskList extends Component {
  constructor (props){
    super(props)
    this.state = {
      tasks: [],
      editingTaskId: null

    }
    this.removeTask = this.removeTask.bind(this)
    this.editTask = this.editTask.bind(this)
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

  editTask(id, list, date_end, duration) {
    const dayId = 1
    axios.put(`http://localhost:3000/api/v1/days/${dayId}/tasks`+ id, {
      task: {
        list, date_end, duration
      }
    })
    .then(response => {
      console.log(response)
      const task = this.state.tasks;
      task[id-1] = {id, list, date_end, duration}
      this.setState(()=> ({
        task,
        editingTaskId: null
      }))
    })
    .catch(error=> console.log(error))
  }

  componentDidMount() {
    const id = 1;
    
    axios.get(`http://localhost:3000/api/v1/days/${id}/tasks`)
      .then(res => {
        const tasks = res.data;
        this.setState({tasks})
      })
  }
  render() {
    return (
    <div> 
      {this.state.tasks.map(task => {
        if (this.state.editingTaskId === task.id) {
        return(
         <div key={task.id}>
          <li className="list-group-item" >{task.list}
            <span className="date-task">{moment(task.date_end).format("ll")}
            <button className="btn btn-warning"
                    onClick={()=> this.editTask(task.id)}><i className="fa fa-pencil-square"></i></button>
            <button className="btm btn-danger"
                    onClick ={()=>this.removeTask(task.id) }
                    editingTaskId={this.editingTaskId}
            ><i className="fa fa-trash"></i></button>
            </span>
          </li>
        </div>)}
        else {
          return(
            <div key={task.id}>
             <li className="list-group-item" >{task.list}
               <span className="date-task">{moment(task.date_end).format("ll")}
               <button className="btn btn-warning"
                    onClick={()=> this.editTask(task.id)}><i className="fa fa-pencil-square"></i></button>
               <button className="btm btn-danger"
                       onClick ={()=>this.removeTask(task.id) }
               ><i className="fa fa-trash"></i></button>
               </span>
             </li>
           </div>)
        }
      })}
    </div>   
    )}
}

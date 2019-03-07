import React, {Component} from 'react'
import SearchPanel from '../search-panel'
import TaskDurationFilter from '../task-duration-filter'
import FormAddTask from '../form-add-task'
import Spinner from '../spinner'
import ErrorIndicator from '../error-indicator'
import Modal from 'react-modal';
import axios from 'axios'
import moment from 'moment'

import './task-list.css'
import {Button, FormControl, FormGroup} from "react-bootstrap";

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    height                : 'auto',
    width                 : 'auto'
  }
};
Modal.setAppElement('body')

export default class TaskList extends Component {
  constructor (props){
    super(props)
    this.state = {
      days: [],
      tasks: [],
      term: '',
      filter: 'all',
      loading: false,
      error: false,
      dateTask: '',
      id: '',
      date_end: '',
      list: '',
      subTasks: [],
      coutCheckbox: null

    }
    this.removeTask = this.removeTask.bind(this)
    this.addNewTask = this.addNewTask.bind(this)
    this.onTaskClick = this.onTaskClick.bind(this)
    this.openModal = this.openModal.bind(this);
    this.openModal2 = this.openModal2.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeModal2 = this.closeModal2.bind(this);
  }
  
  addNewTask(list, date_end, duration) {
    const {days} = this.state
    let day_id
    const task = {task:{ list, day_id: day_id, date_end, duration}}
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

  onTaskClick(id, status, date_end){
    let task

    if (status === "in_progress")
      {task = {task: {status: 'finished'} } }
    else 
      {task = {task: {status: 'in_progress'} } }
    
      const {days} = this.state
    let day_id
    const getDayId = days.forEach( day => {
      if (day.date === date_end) {
        day_id = day.id
      }
      return (day_id)
    })
    const dayId = day_id
    this.setState({sliceId: dayId})
    
    const token = localStorage.getItem("token")
    const config = {
    headers: {'Authorization': "bearer " + token}
    };
    
    axios.put(`http://localhost:3000/api/days/${dayId}/tasks/` + id, task, config)
         .then(response => {
           const newTask = response.data;
           let { tasks } = this.state;
           tasks.forEach(task => {
             if (task.id === newTask.id) {
               task.status = newTask.status;
             }
           })
           this.setState({ tasks })
         })
         .catch(error => {
           console.log(error)
         })
  }

  onToggleImportant(id, importance, date_end){
    let task
    
    if (importance === false)
      {task = {task: {importance: true} } }
    else 
      {task = {task: {importance: false} } }
    
      const {days} = this.state
    let day_id
    const getDayId = days.forEach( day => {
      if (day.date === date_end) {
        day_id = day.id
      }
      return (day_id)
    })
    const dayId = day_id
    
    const token = localStorage.getItem("token")
    const config = {
    headers: {'Authorization': "bearer " + token}
    };
    
    axios.put(`http://localhost:3000/api/days/${dayId}/tasks/` + id, task, config)
         .then(response => {
           const newTask = response.data;
           let { tasks } = this.state;
           tasks.forEach(task => {
             if (task.id === newTask.id) {
               task.importance = newTask.importance;
             }
           })
           this.setState({ tasks })
         })
         .catch(error => {
           console.log(error)
         })
  }

  componentDidMount() {
    const id = this.state.dayId;
    const token = localStorage.getItem("token")
    const config = {
    headers: {'Authorization': "bearer " + token}
    };
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
    this.setState({
      loading: true,
      error: false
    });
  }

  search(tasks, term) {
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
  setDate = (e) => {
    this.setState({dateTask: e.target.value})
  }

  openModal(e) {
    this.setState({modalIsOpen: true});
  }

  openModal2(e) {
    this.setState({modalIsOpen2: true});
  }

  afterOpenModal() {
    this.subtitle.style.color = '#fdffff';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  closeModal2() {
    this.setState({modalIsOpen2: false});
  }
  writeTaskState = (id, created_at, date_end, list) => {
    this.setState({id: id});
    this.setState({date_end: date_end});
    this.setState({list: list})
  }

  writeSubTaskState = (id, day_id) => {
    const token = localStorage.getItem("token")
    const config = {
      headers: {'Authorization': "bearer " + token}
    };
    axios.get(`http://localhost:3000/api/days/${day_id}/tasks/${id}/subtasks`, config)
        .then(response => {
          this.setState({
            subTasks: response.data
          })
        })
  }


  handleSubmit = async event => {
    event.preventDefault();
    let idDay = this.state.dayId
    let idTask = this.state.id
    let data = { subtask_list:
      [
        { task_id: this.state.id,
          description: this.state.list,
          date: this.state.date_end},

        { task_id: this.state.id,
          description: this.state.list,
          date: moment(this.state.date_end).subtract(1, "days").format("YYYY-MM-DD")},

        { task_id: this.state.id,
          description: this.state.list,
          date: moment(this.state.date_end).subtract(2, "days").format("YYYY-MM-DD")},

        { task_id: this.state.id,
          description: this.state.list,
          date: moment(this.state.date_end).subtract(3, "days").format("YYYY-MM-DD")},

        { task_id: this.state.id,
          description: this.state.list,
          date: moment(this.state.date_end).subtract(4, "days").format("YYYY-MM-DD")},

        { task_id: this.state.id,
          description: this.state.list,
          date: moment(this.state.date_end).subtract(5, "days").format("YYYY-MM-DD")},

        { task_id: this.state.id,
          description: this.state.list,
          date: moment(this.state.date_end).subtract(6, "days").format("YYYY-MM-DD")}

  ]}
    const token = localStorage.getItem("token")

    const config = {
      headers: {'Authorization': "bearer " + token}
    };

    await axios.post(`http://localhost:3000/api/days/${idDay}/tasks/${idTask}/subtasks`, data, config)
        .then(function (response) {
          const res = response.data
          console.log(res)
        }).catch(function (error){
          alert(error.message)
        })
    this.closeModal()
  }

  setResolveSubTaskTrue = (res, task_id, id) => {
    const token = localStorage.getItem("token")
    const config = {
      headers: {'Authorization': "bearer " + token}
      };
    const data = {subtask: {resolved: res}}
    axios.patch(`/api/days/:day_id/tasks/${task_id}/subtasks/${id}`, data, config)
    .then(function (response) {
      const day = response.data
      console.log(day)
    }).catch(function (error){
        alert(error.message)
    })

  } 

  render() {
    var currentCount = 0;
    let coutCheckbox = 0;
    const {tasks, term, filter, loading, error, subTasks} = this.state
    debugger
    const spinner = !loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorIndicator/> : null;
    const visibleItem = this.search(this.filter(tasks, filter),term)
    return (
    <div>
      <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal">

        <span onClick={this.closeModal}><span className="close warp black"></span></span>
        <h2 ref={subtitle => this.subtitle = subtitle}>Slice task</h2>
        <div>Task</div>
        <div className="editTask">
          <form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormControl
                  autoFocus
                  id="list"
                  type="text"
                  key={this.state.id}
                  value={this.state.list}
                  onChange={this.setReport}
              />
            </FormGroup>
            <Button
                block
                type="submit">
              Slice subtask
            </Button>
          </form>
        </div>
      </Modal>
      {/*modal sub task*/}
      <Modal
          isOpen={this.state.modalIsOpen2}
          onRequestClose={this.closeModal2}
          style={customStyles}
          contentLabel="Modal">
        <span onClick={this.closeModal2}><span className="close warp black"></span></span>
        <h2 ref={subtitle => this.subtitle = subtitle}>SubTask</h2>
        <div>SubTask</div>
        <div className="subTask">
        <form>
          {subTasks.map (subtask =>{
            function makeCounter() {
              currentCount = currentCount + 1;
              return currentCount;
            }
            return(
              <div>
                <label>
                    Task: {subtask.description}, {moment(subtask.date).format("ddd DD-MMMM")}

                  <input
                      type="checkbox"
                      id={makeCounter()}
                      key={subtask.id}
                      value={subtask.resolved}
                      className={subtask.resolved === true ? 'checkDone' : 'checkNot'}
                      
                      onChange={(e) =>{ 
                        let res = e.target.checked 
                        this.setResolveSubTaskTrue(res, subtask.task_id, subtask.id)}} />
                </label>
              </div>
            )
          })}
          <Button
              block
              type="submit">
            Set
          </Button>
        </form>
        </div>
      </Modal>
       <TaskDurationFilter 
       filter={filter}
       onFilterChange={this.onFilterChange}/> 
      <SearchPanel onSearchChange={this.onSearchChange}/>
       <input type="date"
                autoFocus
                id="dateFilter"
                onChange={this.setDate}
                className="form-control dateFilter"/>   
      {spinner}
      {errorMessage}
      {visibleItem.map(task => {
        return(
         <div key={task.id}>
          <li className={"list-group-item point " + (task.importance === false ? '' : 'importance')}>
            <span
                onClick={() => this.onTaskClick(task.id, task.status, task.date_end)}
                className = {task.status === "in_progress" ? '' : 'finish'}>
                {task.list}</span>
            <span className="date-task">{moment(task.date_end).format("ll")}
               <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={() => this.onToggleImportant(task.id, task.importance, task.date_end)}
                    >
                  <i className="fa fa-exclamation" />
                </button>
                <button className="btn btn-outline-danger btn-sm float-right"
                        onClick ={()=>this.removeTask(task.id) }>
                        <i className="fa fa-trash"/></button>
                <button className={task.duration === "week" ? 'btn btn-outline-warning btn-sm ' : 'durationSlice'}
                        onClick={()=>{ this.openModal();
                        this.writeTaskState(task.id, task.created_at, task.date_end, task.list, task.day_id);}}>
                        <i className="fa fa-scissors"/></button>
                <button className={task.duration === "week" ? 'btn btn-outline-info btn-sm ' : 'durationSlice'}
                        onClick={()=>{ this.openModal2();
                        this.writeSubTaskState(task.id, task.day_id, task.date_end, task.list);}}>
                      <i className="fa fa-list-ol"/></button>
              </span>
          </li>
        </div>)
      })}
        <FormAddTask onNewTask={this.addNewTask} />
    </div>   
    )}
}

import React , {Component} from 'react'


export default class EditTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.task.id,
      date_end: this.props.task.date_end,
      list: this.props.task.list,
      duration: this.props.task.duration
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit(e){
    e.preventDefault();
    const {id, date_end, list, duration} = this.state
    this.props.editTask(id, date_end, list, duration)
  }

  render() {
    return(
      <form onSubmit={this.handleSubmit}>
         <input type="text"
                name="list"
                value={this.state.list}
                onChange={this.handleChange}
                className="form-control"
                placeholder="Enter task"
          />
          <input type="date"
                name="date_end"
                value={this.state.date_end}
                onChange={this.handleChange}
                className="form-control"
          />
          <div className="form-group form-task">
            <label>Duration task:</label>
          <select className="form-control" 
                  id="duration"
                  name="duration"
                  value={this.state.duration}
                  onChange={this.handleChange}>
            <option>day</option>
            <option>week</option>
            <option>month</option>
            <option>year</option>
          </select>
        </div>
        <button className="byn btn-warning">Edit</button>
      </form>
    )
  }
}
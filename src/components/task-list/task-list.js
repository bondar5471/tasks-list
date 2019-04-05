import React, { Component } from "react";
import SearchPanel from "../search-panel";
import TaskDurationFilter from "../task-duration-filter";
import ErrorIndicator from "../error-indicator";
import Modal from "react-modal";
import axios from "axios";
import moment from "moment";
import "./task-list.css";
import { Button, FormControl, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import {
  loadedDays,
  loadedTasks,
  createTask,
  createDay,
  deleteTask,
  editTask,
  onToggleImportant} from "../../actions";
import TaskForm from './reduxTaskForm'


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "auto",
    width: "auto"
  }
};
Modal.setAppElement("body");

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      filter: "all",
      loading: true,
      error: false,
      dateTask: moment().format("YYYY-MM-DD"),
      id: "",
      date_end: "",
      description: "",
      weekDays: [],
      dayId: ""
    };
    this.removeTask = this.removeTask.bind(this);
    this.onTaskClick = this.onTaskClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this)
  }

  componentDidMount() {
    this.props.loadedTasks();
  }

  submit(values) {
    //create day before task if day == undefine
    let day_id;
    this.props.days.forEach(day => {
      if (day.date === values.date_end) {
        day_id = day.id;
      }
      return day_id;
    });
    const day = { date: values.date_end, successful: false };
    if (day_id == undefined) day_id = 'newDay';
    this.props.createTask(values, day_id, day);
  }

  removeTask(id, day_id) {
    this.props.deleteTask(id, day_id)
  }

  onTaskClick(id, status) {
    let task;
    if (status === "in_progress") {
      task = { task: { status: "finished" } };
    } else {
      task = { task: { status: "in_progress" } };
    }
    this.props.editTask(task, id)
  }

  onToggleImportant(id, importance) {
    let task;

    if (importance === false) {
      task = { task: { importance: true } };
    } else {
      task = { task: { importance: false } };
    }
    this.props.onToggleImportant(task, id)
  }

  search(tasks, term) {
    if (term.length === 0) {
      return tasks;
    }
    return tasks.filter(task => {
      return task.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = term => {
    this.setState({ term });
  };

  onFilterChange = filter => {
    this.setState({ filter });
    if (filter === "date") {
      document.getElementById("dateFilter").style.display = "block";
    } else {
      document.getElementById("dateFilter").style.display = "none";
    }
  };

  filter(tasks, filter) {
    switch (filter) {
      case "all":
        return this.props.tasks;
      case "day":
        return this.props.tasks.filter(task => task.duration === "day");
      case "week":
        return this.props.tasks.filter(task => task.duration === "week");
      case "month":
        return this.props.tasks.filter(task => task.duration === "month");
      case "year":
        return this.props.tasks.filter(task => task.duration === "year");
      case "date":
        return this.props.tasks.filter(
          task => task.date_end === this.state.dateTask
        );
      default:
        return tasks;
    }
  }
  setDate = e => {
    this.setState({ dateTask: e.target.value });
  };

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#66797d";
  }

  closeModal() {
    this.setState({ weekDays: [] });
    this.setState({ modalIsOpen: false });
  }

  writeTaskState = (id, date_end, description, day_id) => {
    this.setState({ id: id });
    this.setState({ date_end: date_end });
    this.setState({ description: description });
    this.setState({ dayId: day_id });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const task_id = this.state.id;
    const days = this.state.weekDays;
    const description = this.state.description;
    const data = { days, task_id, task: { description: description } };
    const token = localStorage.getItem("token");

    const config = {
      headers: { Authorization: "bearer " + token }
    };

    await axios
      .post("http://localhost:3000/api/tasks/multi_create", data, config)
      .then(() => {
        this.props.loadedTasks();
      })
      .catch(function(error) {
        alert(error.message);
      });
    this.closeModal();
  };

  setDay = day => {
    const days = [...this.state.weekDays, day];
    this.setState({ weekDays: days });
  };
  removeDay = day => {
    const days = this.state.weekDays.filter(item => item !== day);
    this.setState({ weekDays: days });
  };

  setDescription = e => {
    this.setState({ description: e.target.value });
  };

  render() {
    const { term, filter, error } = this.state;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const visibleItem = this.search(
      this.filter(this.props.tasks, filter),
      term
    );
    return (
      <div className="task-container">
        <h4>Task count: {this.props.tasks.length}</h4>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Modal"
        >
          <span onClick={this.closeModal}>
            <i className="fa fa-times fa-2x btnCloseModal" aria-hidden="true"></i>
          </span>
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Slice task</h2>
          <div>Task</div>
          <div className="editTask">
            <form onSubmit={this.handleSubmit}>
              <FormGroup>
                <FormControl
                  autoFocus
                  id="description"
                  type="text"
                  key={this.state.id}
                  defaultValue={this.state.description}
                  onChange={this.setDescription}
                />
                <fieldset>
                  <legend>Days:</legend>
                  <label className="checkBoxDays" key="1">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="1"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Monday
                  </label>
                  <label className="checkBoxDays" key="2">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="2"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Tuesday
                  </label>
                  <label className="checkBoxDays" key="3">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="3"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Wednesday
                  </label>
                  <label className="checkBoxDays" key="4">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="4"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Thursday
                  </label>
                  <label className="checkBoxDays" key="5">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="5"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Friday
                  </label>

                  <label className="checkBoxDays" key="6">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="6"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Saturday
                  </label>
                  <label className="checkBoxDays" key="7">
                    <input
                      type="checkbox"
                      className="checkBoxDays"
                      name="0"
                      onChange={e => {
                        const res = e.target.checked;
                        const day = e.currentTarget.name;
                        if (res === true) this.setDay(day);
                        else this.removeDay(day);
                      }}
                    />
                    Sunday
                  </label>
                </fieldset>
              </FormGroup>
              <Button block type="submit">
                Slice task
              </Button>
            </form>
          </div>
        </Modal>
        <TaskDurationFilter
          filter={filter}
          onFilterChange={this.onFilterChange}
        />
        <SearchPanel onSearchChange={this.onSearchChange} />
        <input
          type="date"
          autoFocus
          id="dateFilter"
          defaultValue={moment().format("YYYY-MM-DD")}
          onChange={this.setDate}
          className="form-control dateFilter"
        />
        {errorMessage}

        {visibleItem.map(task => {
          return (
            <div key={task.id}>
              <li
                className={
                  "list-group-item point " +
                  (task.importance === false ? "" : "importance")
                }
              >
                <span
                  onClick={() =>
                    this.onTaskClick(task.id, task.status)
                  }
                  className={task.status === "in_progress" ? "" : "finish"}
                >
                  {task.description}
                </span>
                <span className="date-task">
                  {moment(task.date_end).format("ll")}
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm float-right bt-group"
                    onClick={() =>
                      this.onToggleImportant(
                        task.id,
                        task.importance,
                        task.date_end
                      )
                    }
                  >
                    <i className="fa fa-exclamation" />
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm float-right bt-group"
                    onClick={() => {
                      if (window.confirm("Are you sure ?"))
                        this.removeTask(task.id, task.day_id);
                    }}
                  >
                    <i className="fa fa-trash" />
                  </button>
                  <button
                    className={
                      task.duration === "week"
                        ? "btn btn-outline-warning btn-sm bt-group"
                        : "durationSlice"
                    }
                    onClick={() => {
                      this.openModal();
                      this.writeTaskState(
                        task.id,
                        task.date_end,
                        task.description,
                        task.day_id
                      );
                    }}
                  >
                    <i className="fa fa-scissors" />
                  </button>
                </span>
              </li>
            </div>
          );
        })}
        <TaskForm  onSubmit={this.submit} />
      </div>
    );
  }
}
const mapStateToProps = ({ days, tasks }) => {
  return {
    tasks: Object.values(tasks.tasks),
    days: days.days
  };
};

export default connect(
  mapStateToProps,
  { loadedTasks,
    loadedDays,
    createTask,
    createDay,
    deleteTask,
    editTask,
    onToggleImportant
  }
)(TaskList);

import React from 'react'
import moment from 'moment'

import './form-add-task.css'

const FormAddTask = ( { onNewTask = (f) => f } ) => {
  let list, date_end, duration
    const submit = e => {
      e.preventDefault()
      onNewTask(list.value, date_end.value, duration.value)
        document.getElementById('task').style.borderColor = '#333'
        document.getElementById('date').style.borderColor = '#333'
               
        if(list.value === '') {
          document.getElementById('task').style.borderColor = 'red'
        }
        if(date_end.value === '') {
          document.getElementById('date').style.borderColor = 'red'
        }
        
        list.focus()
        list.value = ''
    }
    const datePic = e => {
      e.preventDefault()
      const durationTask = duration.value
      if(durationTask === 'year') {
        const taskYearDate = moment().format('YYYY-12-31');
        document.getElementById('date').value = taskYearDate
      }
      if(durationTask === 'month') {
        const taskMonthDate = moment().endOf('month').format('YYYY-MM-DD');
        document.getElementById('date').value = taskMonthDate
      }
      if(durationTask === 'day') {
        const taskDayDate = moment().format('YYYY-MM-DD');
        document.getElementById('date').value = taskDayDate
      }
      if(durationTask === 'week') {
        const taskWeekDate = moment().endOf('week').add(1, 'days').format('YYYY-MM-DD');//calendar location
        document.getElementById('date').value = taskWeekDate
      }
    }
  return (
      <form className= "form-task"
          onSubmit={ submit }>
          <label>Add task:</label>
          <input type= "text"
              id="task"
              autoComplete="off"
              ref={ input => list = input }
              className="form-control task"
              placeholder="Enter task"
        />
          <input type="date"
              id="date"
              ref={ input => date_end = input }
              className="form-control date"/>

          <div className="form-group form-task">
              <label>Duration task:</label>
              <select className="form-control"
                id="sel1"
                onChange={ datePic }
                ref={ input => duration = input }>
                  <option>day</option>
                  <option>week</option>
                  <option>month</option>
                  <option>year</option>
              </select>
          </div>
          <div className="form-group">
              <button className="btn btn-success"
                id="addTask">
          Add task
              </button>
          </div>
      </form>

  )
}

export default FormAddTask
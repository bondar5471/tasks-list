import React from 'react'

import './form-add-task.css'

const FormAddTask = ({onNewTask = (f) => f}) => {
  let list, date_end, duration
    const submit = e => {
      e.preventDefault()
      onNewTask(list.value, date_end.value, duration.value)
        list.value = ''
        date_end.value = ''
        duration.value = 'day'
        list.focus()
    }
    return (

      <form className="form-task"
            onSubmit={submit}>
         <label>Add task:</label>   
         <input type="text"
                ref={input => list = input}
                className="form-control"
                placeholder="Enter task"
          />
          <input type="date"
                ref={input => date_end = input}
                className="form-control"/>
                
          <div className="form-group form-task">
            <label>Duration task:</label>
          <select className="form-control" 
                  id="sel1"
                  ref={input => duration = input}>
            <option>day</option>
            <option>week</option>
            <option>month</option>
            <option>year</option>
          </select>
        </div>
        <div className="form-group">
          <button className="btn btn-success">
            Add task
          </button>
        </div>
      </form>

    )
}

export default FormAddTask
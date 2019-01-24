import React from 'react';
import './task-list-item.css'

const TaskListItem = ( { label, important = false } ) => {
  const style = {
    color: important ? 'blue' : 'black',
    fontWeight: important ? 'bold' : 'normal'
  };

  return (
    <span className="task-list-item">
    <span
      className="task-list-item-label"
      style={style}>
      {label}
    </span>

    <button type="button"
            className="btn btn-outline-success btn-sm float-right">
      <i className="fa fa-exclamation" />
    </button>

    <button type="button"
            className="btn btn-outline-danger btn-sm float-right">
      <i className="fa fa-trash-alt" />
    </button>
  </span>      
  );    
};

export default TaskListItem;
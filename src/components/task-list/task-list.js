import React from 'react';
import TaskListItem from '../task-list-item'
import './task-list.css'

const TaskList = ({ taskData }) => {

  const elements = taskData.map((item) => {
    
    const { listId , ...itemProps} = item;

    return (
      <li key={ item.listId } className = "list-group-item">< TaskListItem {...itemProps}
      /></li>
    );
  });

  return (
    <ul className = "list-group task-list">
      { elements }
    </ul>
  );
};
export default TaskList;
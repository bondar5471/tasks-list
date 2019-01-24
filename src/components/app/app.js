import React from 'react';


import AppHeader from '../app-header';
import SearchPanel from '../search-panel'
import TaskList from '../task-list'
import ItemStatusFilter from '../item-status-filter'
import './app.css';

const App = () => {
  const taskListData = [
    {label: 'Drink coffee', important: false, listId: 1},
    {label: 'React', important: true, listId: 2},
    {label: 'Lunch', important: false, listId: 3}
  
  ];
  return (
    <div>
    <AppHeader />
    <div className = "top-panel d-flex">
    <SearchPanel />
    <ItemStatusFilter />
    </div>

    <TaskList taskData = { taskListData } />
  </div>
  );
};

export default App;
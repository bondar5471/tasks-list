import React from 'react';
import './app-header.css';

const AppHeader = () => {
  return (
    <div className="app-header d-flex">
      <h1>Task List</h1>
      <h2>{5} more to do, {2} done</h2>
    </div>
  );
};

export default AppHeader;

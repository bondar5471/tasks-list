import React from 'react';
import './search-panel.css'
const SearchPanel = () => {
  const searchHolder = 'Type here to search';
 
  return (
   <input 
    className = "form-control search-input"
    placeholder = {searchHolder} />
  );
};

export default SearchPanel;
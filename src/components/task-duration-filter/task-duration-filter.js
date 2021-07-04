import React, { Component } from 'react'

import './task-duration-filter.css'

export default class TaskDurationFilter extends Component {

  buttons = [
		{ name: 'all',label: 'All' },
    { name: 'day', label: 'Day' },
    { name: 'week', label: 'Week' },
    { name: 'month', label: 'Month' },
    { name: 'year', label: 'Year' },
    { name: 'date', label: 'Date' }
  ]

  render(){

		const { filter, onFilterChange } = this.props
    const buttons = this.buttons.map(({ name, label })=>{
			const isActive = filter === name;
			const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'
      return(
          <button type="button"
                key={ name }
								className={ `btn ${ clazz }` }
								onClick={ ()=>onFilterChange(name) }>
              {label}</button>
			)
		})
  return(
      <div className="btn-group">
          {buttons}
      </div>
  );
 }
}

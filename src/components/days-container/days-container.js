import React, { Component } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import moment from 'moment'
import './days-container.css'
import 'react-calendar-heatmap/dist/styles.css';
class DaysContainer extends Component {
    constructor(props){
			super(props)
			this.state = {
					days: []
			}
		}
		
    componentDidMount() {
			const token = localStorage.getItem("token")

			let config = {
				headers: {'Authorization': "bearer " + token}
		  };
		
		  
        axios.get('http://localhost:3000/api/days',
				config)
				
				.then(response => {
					console.log(config)
            this.setState({
								days: response.data
						})
        })
        .catch(error => console.log(error))
		}

		setValueTasks() {
			this.setState({

			})
		}
    render() {
			const {days} = this.state
			let count = 0 
			  const functionCalculateDateCount = days.map(day=> {
					if (day.successful === true ) {
						count =  3
					} else if (day.successful === false) {
					  count =  2
					} else {
						count = 1
					}
					return(
					 	{date: day.date, count: count}
					)
					
				})
        return (
					<div className="calendar-heatmap calendar">
						<CalendarHeatmap
						tooltipDataAttrs={(value) => { return { 'title': `Date:${value.date}`} }}
						startDate={ new Date(moment(Date.now()).startOf('year').subtract('1', 'days').format("YYYY-MM-DD"))} 
						endDate={new Date(moment(Date.now()).endOf('year').format("YYYY-MM-DD"))}
						values={functionCalculateDateCount}
						classForValue={(value) => {
							if (!value) {
								return 'color-empty';
							}
							return `color-scale-${value.count}`;
						}}
					/>	
					</div>
        )
    }
}
export default DaysContainer;
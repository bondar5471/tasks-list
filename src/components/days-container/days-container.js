import React, { Component } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip'
import { Button, FormGroup, FormControl } from "react-bootstrap";
import Modal from 'react-modal';
import moment from 'moment'
import './days-container.css'
import 'react-calendar-heatmap/dist/styles.css';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('body')

class DaysContainer extends Component {
    constructor(props){
			super(props)
			this.state = {
					days: [],
					modalIsOpen: false,
					report: "",
					successful: false,
					date: "",
					id: ""
			}
			this.openModal = this.openModal.bind(this);
			this.afterOpenModal = this.afterOpenModal.bind(this);
			this.closeModal = this.closeModal.bind(this);
		}
		
    componentDidMount() {
			const token = localStorage.getItem("token")

			let config = {
				headers: {'Authorization': "bearer " + token}
		  };
		
		  
        axios.get('http://localhost:3000/api/days', config)		
				.then(response => {
					console.log(config)
            this.setState({
								days: response.data
						})
        })
        .catch(error => console.log(error))
		}


		openModal(e) {
			this.setState({modalIsOpen: true});
		}
	
		afterOpenModal() {
			this.subtitle.style.color = '#f00';
		}
	
		closeModal() {
			this.setState({modalIsOpen: false});
		}
		setReport = (e) => {
			this.setState({report: e.target.value})
		} 
	
		setSuccessfull = (e) => {
			this.setState({successful: e.target.checked})
		}

		writeDayState = (e) => {
			
			this.setState({id: e.id});
			this.setState({date: e.date});
			this.setState({report: e.report})
		}	
		

		handleSubmit = async event => {
			event.preventDefault();
			let idDay = this.state.id
			let data = { report: this.state.report, successful: this.state.successful }
			const token = localStorage.getItem("token")

      const config = {
      headers: {'Authorization': "bearer " + token}
      };
	
			await axios.put(`http://localhost:3000/api/days/${idDay}`, data, config)
			.then(function (response) {
				const day = response.data
				console.log(day)
			}).catch(function (error){
					alert(error.message)
			})
        debugger
			this.props.history.push('/tasks')
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
					 	{date: day.date, report: day.report, count: count, id: day.id, successful: day.successful}
					)
					
				})
        return (
					<div className="calendar-heatmap calendar">
							<CalendarHeatmap		
							startDate={ new Date(moment(Date.now()).startOf('year').subtract('1', 'days').format("YYYY-MM-DD"))} 
							endDate={new Date(moment(Date.now()).endOf('year').format("YYYY-MM-DD"))}
							values={functionCalculateDateCount}
							onClick={(e)=>{ this.openModal(); this.writeDayState(e);}}
							tooltipDataAttrs={value => {
								return {
									'data-tip': `Date: ${moment(value.date).format('LL')}` ,
									'value': {id: value.id, date: value.date, report: value.report, successful: value.successful}, 
								};
							}}

							classForValue={(value) => {
								if (!value) {
									return 'color-empty';
								}
								return `color-scale-${value.count}`;
							}}
						/>

						<ReactTooltip />

						<Modal
						isOpen={this.state.modalIsOpen}
						onAfterOpen={this.afterOpenModal}
						onRequestClose={this.closeModal}
						style={customStyles}
						contentLabel="Modal">

						<span onClick={this.closeModal}><span className="close warp black"></span></span>
						<h2 ref={subtitle => this.subtitle = subtitle}>{moment(this.state.date).format('LL')}</h2>
							<div>edit this day</div>
								<div className="editDay">
									<form onSubmit={this.handleSubmit}>
										<FormGroup>
											<FormControl
												autoFocus
												id="report"
												type="texy"
												key={this.state.id}
												placeholder={this.state.report}
												onChange={this.setReport}
												/>
										</FormGroup>
										
										<FormGroup>
										<label className="successfulLabel">
											<input 
											  type="checkbox"
											  className="successfulCheck"
											  onChange={this.setSuccessfull}>
											 </input>
											successful day
										</label>	 
										</FormGroup>
										<Button
											block
											type="submit">
											Edit
										</Button>
									</form>
								</div>
						</Modal>	
					</div>
        )
    }
}
export default DaysContainer;
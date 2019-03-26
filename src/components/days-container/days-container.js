import React, { Component } from 'react';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import ReactTooltip from 'react-tooltip'
import Spinner from '../spinner/spinner'
import { Button, FormGroup, FormControl, Dropdown } from 'react-bootstrap';
import Modal from 'react-modal';
import Moment from 'moment';

import { mapDays } from '../../services/mappers';
import './days-container.css'
import 'react-calendar-heatmap/dist/styles.css';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    height                : '350px',
    width                 : '350px',
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
					report: '',
					successful: false,
					date: null,
					id: '',
          loading: true,
          dayRange: []
			}
			this.openModal = this.openModal.bind(this);
			this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
      this.autoComplete = this.autoComplete.bind(this)

    }
		
    componentDidMount() {
			const token = localStorage.getItem('token')

			const config = { headers: { 'Authorization': 'bearer ' + token } };

        axios.get('http://localhost:3000/api/days', config)		
				.then(response => {
            this.setState({
              days: mapDays(response.data),
              loading: false
						})
        })
        .catch(error => console.log(error))
		}

		openModal(value) {
      this.setState({ date: value.date })
			this.setState({ modalIsOpen: true });
		}
	
		afterOpenModal() {
			this.subtitle.style.color = '#416dff';
		}
	
		closeModal() {
			this.setState({ modalIsOpen: false });
			this.setState({ successful: false })
		}
		setReport = (e) => {
			this.setState({ report: e.target.value })
		} 
	
		setSuccessfull = (e) => {
			this.setState({ successful: e.target.checked })
		}

     autoComplete = () => {
       this.setState({ loading: true })
       const token = localStorage.getItem('token')
       axios.get('http://localhost:3000/api/days',
        { params: { status: 'auto' },headers: { 'Authorization': 'bearer ' + token } })
         .then(response => {
            this.setState({
            days:mapDays(response.data),
            loading: false
            })
         })
        .catch(error => console.log(error))
    }

		handleSubmit = async event => {
			event.preventDefault();
			const data = { date: this.state.date, report: this.state.report, successful: this.state.successful }
			const token = localStorage.getItem('token')

      const config = {
      headers: { 'Authorization': 'bearer ' + token }
      };
	
			await axios.post(`http://localhost:3000/api/days/`, data, config)
			.then((response) =>{
				const newDay = response.data
        const days = [ ...this.state.days, newDay ]
        this.setState({ days })
			}).catch(function (error){
					alert(error.message)
			})
      this.closeModal()
		}

    render() {

      const { loading, days } = this.state
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
          { date: day.date, report: day.report, count: count, id: day.id, successful: day.successful }
        )
			});

      if (loading){
        return<Spinner/>
      }

      return (
          <div>
              <div className="calendar-heatmap calendar">

                  <CalendarHeatmap
                startDate={ new Date(Moment(Date.now()).startOf('year').subtract('1', 'days').format('YYYY-MM-DD')) }
                endDate={ new Date(Moment(Date.now()).endOf('year').format('YYYY-MM-DD')) }
                values={ functionCalculateDateCount }
                onClick={ value => this.openModal(value) }
                tooltipDataAttrs={ value => {
                  return {
                    'data-tip': `Date: ${ Moment(value.date).format('LL') }` ,
                    'value': { id: value.id, date: value.date, report: value.report, successful: value.successful },
                  };
                } }

                classForValue={ (value) => {
                  if (!value) {
                    return 'color-empty';
                  }
                  return `color-scale-${ value.count }`;
                } }
              />

                  <ReactTooltip />
                  <Modal
              isOpen={ this.state.modalIsOpen }
              onAfterOpen={ this.afterOpenModal }
              onRequestClose={ this.closeModal }
              style={ customStyles }
              contentLabel="Modal">
                      <span onClick={ this.closeModal }><span className="close warp black"></span></span>
                      <h2 ref={ subtitle => this.subtitle = subtitle }>{Moment(this.state.date).format('LL')}</h2>
                      <div>Create day</div>
                      <div className="editDay">
                          <form onSubmit={ this.handleSubmit }>
                              <FormGroup>
                                  <FormControl
                          autoFocus
                          id="report"
                          type="texy"
                          key={ this.state.id }
                          onChange={ this.setReport }
                          />
                              </FormGroup>
                              <FormGroup>
                                  <label
                        className="successfulLabel croupCheckDay"
                        id="noSet"
                      >
                                      <input
                          type="checkbox"
                          className="successfulCheck"
                          onChange={ this.setSuccessfull }>
                                      </input>
                        successful day
                                  </label>
                              </FormGroup>
                              <Button
                        block
                        type="submit">
                        Create
                              </Button>
                          </form>
                      </div>
                  </Modal>
              </div>
              <Dropdown className="setting">
                  <Dropdown.Toggle variant="dark" id="dropdown-basic">
                      <i className="fa fa-cog"/> Setting
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                      <Dropdown.Item
                  title="Determines the success of the day for completed tasks"
                  onClick={ this.autoComplete }>
                  Auto Complete*</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
          </div>
        )
    }
}
export default DaysContainer;
import React, { Component } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import Modal from "react-modal";
import Moment from "moment";
import { connect } from "react-redux";
import DayForm from "./reduxFormDay";
import { loadedDays, createDay } from "../../actions";

import "./days-container.css";
import "react-calendar-heatmap/dist/styles.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "350px",
    width: "350px",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};
Modal.setAppElement("body");

class DaysContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      date: null,
      loading: true,
      report:''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.submit = this.submit.bind(this);
  }
  submit(values) {
    this.props.createDay(values);
    this.closeModal();
  }

  componentDidMount() {
    this.props.loadedDays();
  }

  openModal(value) {
    this.setState({ report: value.report, date: value.date, modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let count = 0;
    const functionCalculateDateCount = this.props.days.map(day => {
      if (day.successful === true) {
        count = 3;
      } else if (day.successful === false) {
        count = 2;
      } else {
        count = 1;
      }
      return {
        date: day.date,
        report: day.report,
        count: count,
        id: day.id,
        successful: day.successful
      };
    });

    return (
      <div>
        <div className="calendar-heatmap calendar">
          <CalendarHeatmap
            startDate={
              new Date(
                Moment(Date.now())
                  .startOf("year")
                  .subtract("1", "days")
                  .format("YYYY-MM-DD")
              )
            }
            endDate={
              new Date(
                Moment(Date.now())
                  .endOf("year")
                  .format("YYYY-MM-DD")
              )
            }
            values={functionCalculateDateCount}
            onClick={value => this.openModal(value)}
            tooltipDataAttrs={value => {
              return {
                "data-tip": `Date: ${Moment(value.date).format("LL")}`,
                value: {
                  id: value.id,
                  date: value.date,
                  report: value.report,
                  successful: value.successful
                }
              };
            }}
            classForValue={value => {
              if (!value) {
                return "color-empty";
              }
              return `color-scale-${value.count}`;
            }}
          />
          <ReactTooltip />
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Modal"
          >
            <span onClick={this.closeModal}>
              <i className="fa fa-times fa-2x btnCloseModal" aria-hidden="true"></i>
            </span>
            <h2> {Moment(this.state.date).format("MMMM DD.YY")} </h2>
            <p> Report: { this.state.report } </p>
            <DayForm
              onSubmit={this.submit}
              initialValues={{ date: this.state.date, successful: false }}
            />
          </Modal>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ days }) => {
  return { days: days.days };
};
export default connect(
  mapStateToProps,
  {
    loadedDays,
    createDay
  }
)(DaysContainer);

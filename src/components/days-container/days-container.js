import React, { Component } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import { Dropdown } from "react-bootstrap";
import Modal from "react-modal";
import Moment from "moment";
import { connect } from "react-redux";
import DayForm from "./reduxFormDay";
import { loadedDays, createDay, autoCompleteDays } from "../../actions";

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
      loading: true
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.autoComplete = this.autoComplete.bind(this);
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
    this.setState({ date: value.date, modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  autoComplete = () => {
    this.props.autoCompleteDays();
  };

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
              <span className="close warp black" />
            </span>
            <h2> {Moment(this.state.date).format("MMMM DD.YY")} </h2>
            <DayForm
              onSubmit={this.submit}
              initialValues={{ date: this.state.date, successful: false }}
            />
          </Modal>
        </div>
        <Dropdown className="setting">
          <Dropdown.Toggle variant="dark" id="dropdown-basic">
            <i className="fa fa-cog" /> Setting
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              title="Determines the success of the day for completed tasks"
              onClick={this.autoComplete}
            >
              Auto Complete*
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
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
    createDay,
    autoCompleteDays
  }
)(DaysContainer);

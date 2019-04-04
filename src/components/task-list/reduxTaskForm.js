import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import { Field, reduxForm, change, reset } from 'redux-form'
import "./task-list.css";

import moment from "moment";

const datePic = duration => {

  const durationTask = duration;
  if (durationTask === "year") {
    const taskYearDate = moment().format("YYYY-12-31");
    return taskYearDate;
  }
  if (durationTask === "month") {
    const taskMonthDate = moment()
      .endOf("month")
      .format("YYYY-MM-DD");
    return taskMonthDate;
  }
  if (durationTask === "day") {
    const taskDayDate = moment().format("YYYY-MM-DD");
    return  taskDayDate;
  }
  if (durationTask === "week") {
    const taskWeekDate = moment()
      .endOf("week")
      .add(1, "days")
      .format("YYYY-MM-DD"); //calendar location
    return taskWeekDate;
  }
};
const validate = values => {
  const errors = {};
  const requiredFields = [
    'description',
    'duration'
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Field must not be empty'
    }
  });
  return errors
};

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>
  }
};
const renderDatePicker = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    placeholder={label}
    type="date"
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);
const renderTextField = ({
 label,
 input,
 meta: { touched, invalid, error },
 ...custom
}) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

class TaskForm extends Component {
  handleSelectChange = (e, input) => {
    input.onChange(e);
    this.props.changeFieldValue('date_end', datePic(e.target.value));
  };

  renderSelectField = ({
     input,
     label,
     meta: { touched, error },
     children,
     ...custom
   }) => (
    <FormControl error={touched && error}>
      <InputLabel htmlFor="duration">Duration</InputLabel>
      <Select
        native
        {...input}
        {...custom}
        onChange={(e) => this.handleSelectChange(e, input)}
        inputProps={{
          name: 'duration',
          id: 'duration'
        }}
      >
        {children}
      </Select>
      {renderFromHelper({ touched, error })}
    </FormControl>
  )

  render () {
    const {onSubmit, handleSubmit, reset} = this.props
    return (
      <form onSubmit={ handleSubmit(onSubmit) } className="formTask">
        <div>
          <Field
            className="fieldDescription"
            name="description"
            component={renderTextField}
            label="Description"/>
        </div>
        <div>
          <Field
            id="datePicker"
            className="fieldDate"
            name="date_end"
            component={renderDatePicker}
          />
        </div>
        <div>
          <Field
            className="fieldSelect"
            name="duration"
            component={this.renderSelectField}
            label="Duration"
          >
            <option value="" />
            <option value={'day'}>Day</option>
            <option value={'week'}>Week</option>
            <option value={'month'}>Month</option>
            <option value={'year'}>Year</option>
          </Field>
        </div>
        <Button type="submit" variant="contained" color="primary" className="buttonAdd">
          Add task
        </Button>
        <Button type="button" variant="contained" color="inherit" onClick={reset} className="buttonRes">
          <i className="fa fa-refresh fa-2x"></i>
        </Button>
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeFieldValue: (name, value) => {
      dispatch(change('taskCreate', name, value));
    }
  };
};

export default reduxForm({
  form: 'taskCreate',
  validate
})(
  connect(
    null,
    mapDispatchToProps
  )(TaskForm)
);

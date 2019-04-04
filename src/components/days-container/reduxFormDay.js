import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Field, reduxForm } from 'redux-form'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'report'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'No valid data'
    }
  })
  return errors
}

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
)

const renderCheckbox = ({ input, label }) => (
  <div>
    <FormControlLabel
      control={
        <Checkbox
          checked={input.value ? true : false}
          onChange={input.onChange}
        />
      }
      label={label}
    />
  </div>
)

class DayForm extends Component {
  render () {
    const {onSubmit, handleSubmit} = this.props
    return (
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div>
          <Field
            name="report"
            component={renderTextField}
            label="Report"/>
        </div>
        <div>
          <Field
            name="successful"
            component={renderCheckbox}
            label="Successful"/>
        </div>
        <Button type="submit" variant="contained" color="primary">
          Create
        </Button>
      </form>
    )
  }
}

DayForm = reduxForm ({
  form: 'dayCreate',
  validate
}) (DayForm)

export default DayForm


import React from 'react'
import { Field, reduxForm } from 'redux-form'

let DayForm = props => {
  const { handleSubmit } = props
  return (
      <form onSubmit={ handleSubmit }>
          <div>
              <label htmlFor="report">Report</label>
              <Field name="report" component="input" type="text"/>
          </div>
          <div>
              <label htmlFor="successful">Successful</label>
              <Field name="successful" component="input" type="checkbox"/>
          </div>
          <button type="submit">Submit</button>
      </form>
  )
}
DayForm = reduxForm({
  form: 'day'
})(DayForm)

export default DayForm

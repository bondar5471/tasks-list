import  { combineReducers } from 'redux'
import  daysReducer from './daysReducer'
import tasksReducer from './tasksReducer'
import { reducer as formReducer } from "redux-form";

export default  combineReducers({
  days: daysReducer,
  tasks: tasksReducer,
  form: formReducer
});
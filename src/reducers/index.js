import  { combineReducers } from 'redux'
import  daysReducer from './daysReducer'
import tasksReducer from './tasksReducer'
import { reducer as formReducer } from "redux-form";
import userReducer from "./userReducer";



export default combineReducers({
  days: daysReducer,
  tasks: tasksReducer,
  user: userReducer,
  form: formReducer
});
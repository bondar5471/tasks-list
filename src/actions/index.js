import diary from '../apis/diary'
import { mapDays } from '../services/mappers';

const loadedDays = () => async dispatch => {
    const token = localStorage.getItem('token')
    const config = { headers: { 'Authorization': 'bearer ' + token } }
    const days = await diary.get('/days', config)
    let response = mapDays(days.data)
    dispatch({ type: 'LOADED_DAYS', payload: response }) ;
  };

const createDay = (dayData) => async dispatch => {
  const token = localStorage.getItem('token')
  const config = { headers: { 'Authorization': 'bearer ' + token } }
  const days = await diary.post('/days', dayData, config)
  let response = mapDays(days.data)
  dispatch({ type: 'CREATE_DAY', payload: response }) ;
};

const autoCompleteDays = (days) => {
  return {
    type: 'AUTO_COMPLETE_DAYS',
    payload: days
  }
}
const deleteDay = (day) => {
  return {
    type: 'DELETE_DAY',
    payload: day
  };
};

const loadedTasks = () => async dispatch => {
  const token = localStorage.getItem('token')
  const config = { headers: { 'Authorization': 'bearer ' + token } }
  const response = await diary.get('/tasks', config)
  dispatch({ type: 'LOADED_TASKS', payload: response.data }) ;
};
const createTask = (taskData) => {
  return{
    type: 'CREATE_TASK',
    payload: taskData
  };
};

const editTask = (task) => {
  return {
    type: 'EDIT_TASK',
    payload: task
  }
}

const sliceTask = (task) => {
  return {
    type: 'SLICE_TASK',
    payload: task
  }
}

const deleteTask = (task) => {
  return {
    type: 'DELETE_TASK',
    payload: task
  };
};

export {
  loadedDays,
  createDay,
  autoCompleteDays,
  deleteDay,
  loadedTasks,
  createTask,
  editTask,
  sliceTask,
  deleteTask
}
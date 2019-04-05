import diary from '../apis/diary'
import mapKeys from 'lodash/mapKeys'
import { mapDays } from '../services/mappers';

const loadedDays = () => async dispatch => {
    const token = localStorage.getItem('token')
    const config = { headers: { 'Authorization': 'bearer ' + token } }
    const days = await diary.get('/days', config);
    dispatch({ type: 'LOADED_DAYS', payload: mapDays(days.data) }) ;
  };

const createDay = (values) => async dispatch => {
  const token = localStorage.getItem('token')
  const config = { headers: { 'Authorization': 'bearer ' + token } }
  const response = await diary.post('/days', values, config);
  dispatch({ type: 'CREATE_DAY', payload: response.data }) ;
};

const loadedTasks = () => async dispatch => {
  const token = localStorage.getItem('token')
  const config = { headers: { 'Authorization': 'bearer ' + token } }
  const response = await diary.get('/tasks', config)
  dispatch({ type: 'LOADED_TASKS', payload: mapKeys(response.data, 'id') }) ;
};

const createTask = (values, id, day) => async dispatch => {
  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': 'bearer ' + token } };
  const params = { ...values, day };
  const response = await diary.post(`/days/${id}/tasks`, params, config);
  dispatch({ type: 'CREATE_TASK', payload: response.data }) ;
};

const editTask = (task, id) => async dispatch => {
  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': 'bearer ' + token } };
  const response = await diary.patch(`/tasks/${id}`, task, config);
  dispatch({ type: 'EDIT_TASK', payload: response.data }) ;
};


const onToggleImportant = (task, id) => async dispatch => {
  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': 'bearer ' + token } };
  const response = await diary.patch(`/tasks/${id}`, task, config);
  dispatch({ type: 'EDIT_TASK', payload: response.data }) ;
};

const deleteTask = (id, id_day) => async dispatch => {
  const token = localStorage.getItem('token');
  const config = { headers: { 'Authorization': 'bearer ' + token } };
  await diary.delete(`/days/${id_day}/tasks/${id}`, config);
  dispatch({ type: 'DELETE_TASK', payload: id }) ;
};

export {
  loadedDays,
  createDay,
  loadedTasks,
  createTask,
  editTask,
  onToggleImportant,
  deleteTask
}
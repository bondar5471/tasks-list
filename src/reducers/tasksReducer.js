import omit from 'lodash/omit'
const initialState = { tasks: {} };
export default (state = initialState, action) => {
  let { tasks } = state;
  switch (action.type) {
    case 'LOADED_TASKS':
      return {...state, tasks: action.payload };
    case 'CREATE_TASK':
      return {...state, tasks: { ...state.tasks, [action.payload.task.id]: action.payload.task } };
    case 'EDIT_TASK':
      if (action.payload.parent_task) {
        tasks = { ...tasks, [action.payload.parent_task.id]: action.payload.parent_task };
      }
      return {...state, tasks: { ...tasks, [action.payload.task.id]: action.payload.task } };
    case 'DELETE_TASK':
      return {...state, tasks: omit(state.tasks, [action.payload.id].concat(action.payload.ids)) };
    default:
      return state;
  }
}
import omit from 'lodash/omit'
const initialState = { tasks: {} };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADED_TASKS':
      return {...state, tasks: action.payload };
    case 'CREATE_TASK':
      return {...state, tasks: { ...state.tasks, [action.payload.task.id]: action.payload.task } };
    case 'EDIT_TASK':
      return {
      };
    case 'SLICE_TASK':
      return {
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: omit(state.tasks, action.payload),
      };

    default:
      return state;
  }
}
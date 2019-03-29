export default (state = [], action) => {
  switch (action.type) {
    case 'LOADED_TASKS':
      return action.payload ;
    case 'CREATE_TASK':
      return {
      };
    case 'EDIT_TASK':
      return {
      };
    case 'SLICE_TASK':
      return {
      };
    case 'DELETE_TASK':
      return {
      };
    default:
      return state;
  }
}

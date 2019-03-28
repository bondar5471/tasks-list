const initialState = {
  days: [],
  tasks: []
}

const reducer = (state = initialState, action ) => {
  switch (action.type) {
    case 'DAYS_LOADED':
      return {
        days: action.payload
      }
    case 'TASKS_LOADED':
      return {
        tasks: action.payload
      }
    default:
      return state;
  }
};
export default  reducer;
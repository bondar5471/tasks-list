const initialState = { days: [] };

export default (state = initialState, action) => {
  let days = null;
  switch (action.type) {
    case 'LOADED_DAYS':
      return { ...state, days: action.payload };
    case 'CREATE_DAY':
      days = state.days.map(day => {
        if (day.date === action.payload.date) day = { ...action.payload };
        return day;
      });
      return { ...state, days };
    case 'UPDATE_DAY':
      days = state.days.map(day => {
        if (day.date === action.payload.date) day = { ...action.payload };
        return day;
      });
      return { ...state, days };
    case 'CREATE_TASK':
      days = state.days.map(day => {
        if (day.date === action.payload.day.date) return action.payload.day;
        return day;
      });
      return {...state, days };
    case 'EDIT_TASK':
      days = state.days.map(day => {
        if (day.date === action.payload.day.date) return action.payload.day;
        return day; });
      return {...state, days };
      default:
       return state;
  }
}

export default (state = [], action) => {
  switch (action.type) {
    case 'LOADED_DAYS':
      return  action.payload ;
    case 'CREATE_DAY':
      return {};
    case 'AUTO_COMPLETE_DAYS':
      return {};
    case 'DELETE_DAY':
      return {};
    default:
       return state;
  }
}

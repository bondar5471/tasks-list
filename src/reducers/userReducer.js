import jwtDecode from "jwt-decode";

const initialState = { user: {}, token: localStorage.getItem("token") };
export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_USER':
      return {...state.user, user: jwtDecode(action.payload.jwt), token: action.payload.jwt };
    case 'SIGNUP_USER':
      return {...state.user, user: jwtDecode(action.payload.jwt), token: action.payload.jwt };
    case 'LOGOUT_USER':
      return initialState;
    default:
      return state;
  }
}
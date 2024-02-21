import {SIGN_UP, LOGIN, LOGOUT} from '../actions/authActions';

const initialState = {
  users: [],
  currentUser: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case LOGIN:
      return {
        ...state,
        currentUser: action.payload,
      };

    case LOGOUT:
      return {
        ...state,
        currentUser: null,
      };

    default:
      return state;
  }
};

export default authReducer;

import {
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../constants";

const initialState = {
  logging: false,
  user: null,
  error: null,
};

const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_STARTED:
      return {
        ...state,
        logging: true,
        user: null,
        error: null,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        logging: false,
        user: action.payload,
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        logging: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default login;

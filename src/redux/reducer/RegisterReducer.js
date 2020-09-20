import {
  REGISTER_USER_STARTED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "../constants";

const initialState = {
  logging: false,
  user: null,
  error: null,
};

const register = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_STARTED:
      return {
        ...state,
        logging: true,
        user: null,
        error: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        logging: false,
        user: action.payload,
        error: null,
      };
    case REGISTER_USER_FAILURE:
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

export default register;

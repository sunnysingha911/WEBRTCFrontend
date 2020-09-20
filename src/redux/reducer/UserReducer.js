import {
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../constants";

const initialState = {
  fetchingUser: false,
  user: null,
  error: null,
};

const getUser = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_STARTED:
      return {
        ...state,
        fetchingUser: true,
        user: null,
        error: null,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        fetchingUser: false,
        user: action.payload,
        error: null,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        fetchingUser: false,
        user: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getUser;

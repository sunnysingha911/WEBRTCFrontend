import {
  GET_MESSAGE_STARTED,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from "../constants";

const initialState = {
  gettingMessages: false,
  messages: null,
  error: null,
};

const getMessages = (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGE_STARTED:
      return {
        ...state,
        gettingMessages: true,
        messages: null,
        error: null,
      };
    case GET_MESSAGE_SUCCESS:
      return {
        ...state,
        gettingMessages: false,
        messages: action.payload,
        error: null,
      };
    case GET_MESSAGE_FAILURE:
      return {
        ...state,
        gettingMessages: false,
        messages: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getMessages;

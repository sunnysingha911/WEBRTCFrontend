import {
  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from "../constants";

const initialState = {
  sendingMessage: false,
  message: null,
  error: null,
};

const sendMessages = (state = initialState, action) => {
  switch (action.type) {
    case SEND_MESSAGE_STARTED:
      return {
        ...state,
        sendingMessage: true,
        message: null,
        error: null,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        sendingMessage: false,
        message: action.payload,
        error: null,
      };
    case SEND_MESSAGE_FAILURE:
      return {
        ...state,
        sendingMessage: false,
        message: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default sendMessages;

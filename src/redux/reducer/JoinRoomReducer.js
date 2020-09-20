import {
  JOIN_ROOM_STARTED,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
} from "../constants";

const initialState = {
  joiningRoom: false,
  room: null,
  error: null,
};

const joinRoom = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_ROOM_STARTED:
      return {
        ...state,
        joiningRoom: true,
        room: null,
        error: null,
      };
    case JOIN_ROOM_SUCCESS:
      return {
        ...state,
        joiningRoom: false,
        room: action.payload,
        error: null,
      };
    case JOIN_ROOM_FAILURE:
      return {
        ...state,
        joiningRoom: false,
        room: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default joinRoom;

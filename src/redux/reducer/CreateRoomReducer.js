import {
  CREATE_ROOM_STARTED,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
} from "../constants";

const initialState = {
  creatingRoom: false,
  room: null,
  error: null,
};

const createRoom = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ROOM_STARTED:
      return {
        ...state,
        creatingRoom: true,
        room: null,
        error: null,
      };
    case CREATE_ROOM_SUCCESS:
      return {
        ...state,
        creatingRoom: false,
        room: action.payload,
        error: null,
      };
    case CREATE_ROOM_FAILURE:
      return {
        ...state,
        creatingRoom: false,
        room: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createRoom;

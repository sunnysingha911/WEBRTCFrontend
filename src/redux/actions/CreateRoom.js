import {
  CREATE_ROOM_STARTED,
  CREATE_ROOM_SUCCESS,
  CREATE_ROOM_FAILURE,
} from "../constants";
import axios from "axios";

export const createRoom = (roomName, user) => {
  return (dispatch) => {
    dispatch(createRoomStarted());
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      axios
        .post(
          "/chatrooms",
          {
            createRoom: true,
            roomname: roomName,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          dispatch(createRoomSuccess(res.data));
        })
        .catch((error) => {
          if (error.response) {
            dispatch(createRoomFailure(error.response.statusText));
          } else {
            dispatch(createRoomFailure(error));
          }
        });
    } else {
      dispatch(createRoomFailure("You are not logged in"));
    }
  };
};

const createRoomStarted = () => ({
  type: CREATE_ROOM_STARTED,
});

const createRoomSuccess = (room) => ({
  type: CREATE_ROOM_SUCCESS,
  payload: room,
});

const createRoomFailure = (error) => ({
  type: CREATE_ROOM_FAILURE,
  payload: error,
});

import {
  JOIN_ROOM_STARTED,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
} from "../constants";
import axios from "axios";

export const joinRoom = (roomId, user) => {
  return (dispatch) => {
    dispatch(joinRoomStarted());
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      axios
        .put(
          `/chatrooms/join/${roomId}`,
          {
            addUser: true,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          dispatch(joinRoomSuccess(res.data));
        })
        .catch((error) => {
          if (error.response) {
            dispatch(joinRoomFailure(error.response.data.message));
          } else {
            dispatch(joinRoomFailure(error));
          }
        });
    } else {
      dispatch(joinRoomFailure("You are not logged in"));
    }
  };
};

const joinRoomStarted = () => ({
  type: JOIN_ROOM_STARTED,
});

const joinRoomSuccess = (room) => ({
  type: JOIN_ROOM_SUCCESS,
  payload: room,
});

const joinRoomFailure = (error) => ({
  type: JOIN_ROOM_FAILURE,
  payload: error,
});

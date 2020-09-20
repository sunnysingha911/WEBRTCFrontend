import {
  SEND_MESSAGE_STARTED,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
} from "../constants";
import axios from "axios";

export const sendMessage = (message, userId, roomId) => {
  return (dispatch) => {
    dispatch(sendMessageStarted());
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      axios
        .post(
          "/chats",
          {
            chat: message,
            user: userId,
            chatroom: roomId,
          },
          {
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        .then((res) => {
          dispatch(sendMessageSuccess(res.data));
        })
        .catch((error) => {
          if (error.response) {
            dispatch(sendMessageFailure(error.response.statusText));
          } else {
            dispatch(sendMessageFailure(error));
          }
        });
    } else {
      dispatch(sendMessageFailure("You are not logged in"));
    }
  };
};

const sendMessageStarted = () => ({
  type: SEND_MESSAGE_STARTED,
});

const sendMessageSuccess = (message) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: message,
});

const sendMessageFailure = (error) => ({
  type: SEND_MESSAGE_FAILURE,
  payload: error,
});

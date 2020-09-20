import {
  GET_MESSAGE_STARTED,
  GET_MESSAGE_SUCCESS,
  GET_MESSAGE_FAILURE,
} from "../constants";
import axios from "axios";

export const getMessages = (roomId) => {
  return (dispatch) => {
    dispatch(getMessageStarted());
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      axios
        .get(`/chats?chatroom._id_eq=${roomId}`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          let messages = [];
          res.data.map((message) => {
            messages.push({
              chat: message.chat,
              user: message.user._id,
              userName: message.user.username,
            });
          });
          dispatch(getMessageSuccess(messages));
        })
        .catch((error) => {
          console.log(error.response);
          dispatch(getMessageFailure(error.response.data.message));
        });
    } else {
      dispatch(getMessageFailure("You are not logged in"));
    }
  };
};

const getMessageStarted = () => ({
  type: GET_MESSAGE_STARTED,
});

const getMessageSuccess = (messages) => ({
  type: GET_MESSAGE_SUCCESS,
  payload: messages,
});

const getMessageFailure = (error) => ({
  type: GET_MESSAGE_FAILURE,
  payload: error,
});

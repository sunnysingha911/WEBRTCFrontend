import {
  GET_USER_STARTED,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
} from "../constants";
import axios from "axios";

export const getUser = () => {
  return (dispatch) => {
    if (localStorage.getItem("jwt")) {
      dispatch(getUserStarted());
      const jwt = localStorage.getItem("jwt");
      axios
        .get("/users/me", {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        })
        .then((res) => {
          dispatch(getUserSuccess(res.data));
        })
        .catch((error) => {
          if (error.response) {
            dispatch(getUserFailure(error.response.statusText));
          } else {
            dispatch(getUserFailure(error));
          }
        });
    } else {
      dispatch(getUserFailure("You are not logged in"));
    }
  };
};

const getUserStarted = () => ({
  type: GET_USER_STARTED,
});

const getUserSuccess = (user) => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

const getUserFailure = (error) => ({
  type: GET_USER_FAILURE,
  payload: error,
});

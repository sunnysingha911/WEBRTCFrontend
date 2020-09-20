import {
  LOGIN_USER_STARTED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../constants";
import axios from "axios";

export const login = (identifier, password) => {
  return (dispatch) => {
    dispatch(loginStarted());
    axios
      .post("/auth/local", { identifier, password })
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);
        dispatch(loginSuccess(res.data.user));
      })
      .catch((error) => {
        dispatch(
          loginFailure(error.response.data.message[0].messages[0].message)
        );
      });
  };
};

const loginStarted = () => ({
  type: LOGIN_USER_STARTED,
});

const loginSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});

const loginFailure = (error) => ({
  type: LOGIN_USER_FAILURE,
  payload: error,
});

import {
  REGISTER_USER_STARTED,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
} from "../constants";
import axios from "axios";

export const register = (username, email, password, role) => {
  return (dispatch) => {
    dispatch(registerStarted());
    axios
      .post("/auth/local/register", { username, email, password, role })
      .then((res) => {
        localStorage.setItem("jwt", res.data.jwt);
        dispatch(registerSuccess(res.data.user));
      })
      .catch((error) => {
        dispatch(
          registerFailure(error.response.data.message[0].messages[0].message)
        );
      });
  };
};

const registerStarted = () => ({
  type: REGISTER_USER_STARTED,
});

const registerSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});

const registerFailure = (error) => ({
  type: REGISTER_USER_FAILURE,
  payload: error,
});

import { userConstants } from "Constants";
import { currentMatchConstants } from "Constants";

import { authService } from "Services";
import { alertActions } from "./";
import { history } from "../Helpers";
export const userActions = {
  login,
  register
};

function login(username, password) {
  return dispatch => {
    dispatch({ type: userConstants.LOGIN_REQUEST, username });

    localStorage.setItem("user", JSON.stringify(username));

    dispatch({ type: userConstants.LOGIN_SUCCESS, username });
    dispatch({ type: currentMatchConstants.GET_TEAMS });

    authService.login(username, password).then(
      user => {
        dispatch({ type: userConstants.LOGIN_SUCCESS, user });
        history.push("/");
      },
      error => {
        dispatch({
          type: userConstants.LOGIN_FAILURE,
          error: error
        });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

function register(user) {
  return dispatch => {
    dispatch({ type: userConstants.REGISTER_REQUEST, user });

    authService.register(user).then(
      user => {
        dispatch({ type: userConstants.REGISTER_SUCCESS, user });
        dispatch(alertActions.success("Registration successful"));
      },
      error => {
        dispatch({ type: userConstants.REGISTER_FAILURE, error });
        dispatch(alertActions.error(error.toString()));
      }
    );
  };
}

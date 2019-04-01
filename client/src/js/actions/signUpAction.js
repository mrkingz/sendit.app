import request from "@request";
import actionTypes from "@actionTypes";
import messageAction from "@actions/messageAction";

const signUpAction = formData => async dispatch => {
  try {
    await request.post("/auth/signup", formData);
    dispatch({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-success",
        message: "Your account was succesfully created"
      }
    });
    return true;
  } catch (error) {
    dispatch({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-danger",
        isProcessing: false,
        message:
          error.response.status < 500
            ? error.response.data.message
            : "Soemthing went wrong. Sign up  not successful"
      }
    });
  }
  return false;
};

export default signUpAction;

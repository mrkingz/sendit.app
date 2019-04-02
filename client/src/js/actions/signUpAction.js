import request from "@request";
import actionTypes from "@actionTypes";

const signUpAction = (formData, history) => async dispatch => {
  try {
    const response = await request.post("/auth/signup", formData);
    if (response.status === 201) {
      history.push("/signin");
      dispatch({
        type: actionTypes.SHOW_MESSAGE,
        payload: {
          styles: "alert-success",
          message:
            "<div>Your account was succesfully created <br> Please, sign in to continue...</div>"
        }
      });
      return true;
    }
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

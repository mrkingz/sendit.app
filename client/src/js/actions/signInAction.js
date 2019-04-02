import request from "@request";
import actionTypes from "@actionTypes";
import setAuthorization from "@utils/setAuthorization";

const signInAction = (credentials, history, from) => async dispatch => {
  try {
    const response = await request.post("/auth/login", credentials);
    if (response.status === 200) {
      setAuthorization(response.data.data.token);
      if (from) {
        history.push(from);
      }
      history.push("/dashboard");
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: {
          user: response.data.data.user
        }
      });
      dispatch({
        type: actionTypes.HIDE_MESSAGE
      });
    }
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
};
export default signInAction;

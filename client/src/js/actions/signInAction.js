import request from "../../js/utils/request";
import actionTypes from "./actionTypes";
import setAuthorization from "../../js/utils/setAuthorization";

const signInAction = (credentials, history, from) => async dispatch => {
  try {
    const response = await request.post("/auth/login", credentials);
    if (response.status === 200) {
      setAuthorization(response.data.user.token);
      if (from) {
        history.push(from);
      }
      history.push("/dashboard");
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: {
          user: response.data.user
        }
      });
      dispatch({
        type: actionTypes.HIDE_MESSAGE
      });
      return true;
    }
    return false;
  } catch (error) {
    dispatch({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-danger",
        isProcessing: false,
        message:
          error.response && error.response.status < 500
            ? error.response.data.message
            : "Soemthing went wrong. Sign up  not successful <br /> Pleaese, try again later..."
      }
    });
    return false;
  }
};
export default signInAction;

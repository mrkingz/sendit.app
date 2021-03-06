import request from "../../js/utils/request";
import actionTypes from "./actionTypes";
import setAuthorization from "../../js/utils/setAuthorization";

const signInAction = (credentials, history, from) => async dispatch => {
  try {
    const { data, status } = await request.post("/auth/login", credentials);
    if (status === 200) {
      setAuthorization(data.user.token);
      if (from) {
        history.push(from);
      }
      history.push("/dashboard");
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: { user: data.user }
      });
      dispatch({ type: actionTypes.HIDE_MESSAGE });
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
            : "Something went wrong. Sign in  not successful <br /> Pleaese, try again later..."
      }
    });
    return false;
  }
};

export default signInAction;

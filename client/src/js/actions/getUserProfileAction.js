import request from "../utils/request";
import actionTypes from "./actionTypes";

const getUserProfileAction = async dispatch => {
  try {
    const { data } = await request.get("/auth/profileDetails");
    dispatch({
      type: actionTypes.SET_CURRENT_USER,
      payload: { user: data.user }
    });
  } catch (error) {
    dispatch({
      type: actionTypes.LOGOUT_CURRENT_USER,
      payload: {}
    });
  }
};

export default getUserProfileAction;

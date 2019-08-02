import actionTypes from "./actionTypes";

const modalAction = action => dispatch => {
  dispatch({
    type: action.type,
    payload: action.payload || {}
  });
  if (action.type !== actionTypes.IS_SUCCESSFUL) {
    dispatch({
      type: actionTypes.HIDE_MESSAGE
    });
  } else if (action.type === actionTypes.IS_SUCCESSFUL) {
    dispatch({
      type: actionTypes.SHOW_MESSAGE,
      payload: {
        styles: "alert-success",
        message: action.payload.message
      }
    });
  }
};
export default modalAction;

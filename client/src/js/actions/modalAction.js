import actionTypes from "./actionTypes";

const modalAction = action => dispatch => {
  dispatch({
    type: action.type,
    payload: action.payload || {}
  });
  if (action.type !== actionTypes.IS_SUCCESSFULL) {
    dispatch({
      type: actionTypes.HIDE_MESSAGE
    });
  }
};
export default modalAction;

import actionTypes from "@actions/actionTypes";

const modalAction = action => dispatch => {
  dispatch({
    type: action.type,
    payload: action.payload || {}
  });
  dispatch({
    type: actionTypes.HIDE_MESSAGE
  });
};
export default modalAction;

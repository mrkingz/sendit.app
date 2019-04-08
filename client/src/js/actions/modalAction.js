import actiontypes from "@actions/actionTypes";

const modalAction = action => dispatch => {
  dispatch({
    type: action.type,
    payload: action.payload || {}
  });
};
export default modalAction;

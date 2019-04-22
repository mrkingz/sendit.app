import actionTypes from "./actionTypes";

const profileAction = action => dispatch => {
  dispatch({
    type: action.type,
    payloay: action.payloay
  });
};
export default profileAction;

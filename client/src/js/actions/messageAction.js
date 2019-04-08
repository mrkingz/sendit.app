import actionTypes from "@actionTypes";

const messageAction = action => dispatch => {
  dispatch({
    type: action.type,
    payload: action.payload
  });
};
export default messageAction;

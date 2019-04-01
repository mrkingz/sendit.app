import actionTypes from "@actionTypes";

const messageAction = options => dispatch => {
  dispatch({
    type: options.type,
    payload: options.payload
  });
};
export default messageAction;

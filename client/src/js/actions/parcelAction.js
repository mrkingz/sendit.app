import actionTypes from "./actionTypes";

const parcelAction = action => dispatch => {
  dispatch({
    type: action.type,
    payload: action.payload
  });
};

export default parcelAction;

import actionTypes from "./actionTypes";

const processingAction = (start = true) => dispatch => {
  dispatch({
    type: start
      ? actionTypes.SHOW_PROCESSING_MODAL
      : actionTypes.CLOSE_PROCESSING_MODAL
  });
};
export default processingAction;

import actionTypes from "@actionTypes";

const processingReducer = (
  state = {
    showProcessing: false
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SHOW_PROCESSING_MODAL:
      return {
        ...state,
        showProcessing: true
      };
    case actionTypes.CLOSE_PROCESSING_MODAL:
      return {
        ...state,
        showProcessing: false
      };
    default:
      return state;
  }
};
export default processingReducer;

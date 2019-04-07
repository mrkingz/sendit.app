import actionTypes from "@actionTypes";

const messageReducer = (
  state = {
    styles: "alert-success",
    message: "",
    isProcessing: false
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SHOW_MESSAGE:
      return {
        ...state,
        isProcessing: false,
        styles: action.payload.styles,
        message: action.payload.message
      };
    case actionTypes.HIDE_MESSAGE:
      return {
        ...state,
        styles: "",
        message: "",
        isProcessing: false
      };
    case actionTypes.REQUEST_PROCESSING:
      return {
        ...state,
        styles: "",
        message: "",
        isProcessing: true
      };
    default:
      return state;
  }
};
export default messageReducer;

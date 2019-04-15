import actionTypes from "../actions/actionTypes";

const modalReducer = (
  state = {
    isShow: false,
    type: "alert",
    size: "modal-sm",
    isStatic: false,
    title: "",
    isSuccessful: false
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SHOW_MODAL:
      return {
        ...state,
        isShow: true,
        type: action.payload.type || "alert",
        size: action.payload.size || "modal-sm",
        title: action.payload.title || state.title,
        isStatic: action.payload.isStatic || state.isStatic
      };
    case actionTypes.IS_SUCCESSFULL:
      return {
        ...state,
        type: "alert",
        isStatic: false,
        isShow: true,
        isSuccessful: true,
        title: "Successful!"
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isShow: false,
        type: "alert",
        size: "modal-sm",
        isStatic: false,
        title: "",
        isSuccessful: false
      };
    default:
      return state;
  }
};
export default modalReducer;

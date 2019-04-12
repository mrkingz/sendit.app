import actionTypes from "@actionTypes";

const modalReducer = (
  state = {
    isShow: false,
    type: "alert",
    size: "modal-sm",
    isStatic: false
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
        isStatic: action.payload.isStatic || state.isStatic
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isShow: false,
        type: "alert",
        size: "modal-sm",
        isStatic: false
      };
    default:
      return state;
  }
};
export default modalReducer;

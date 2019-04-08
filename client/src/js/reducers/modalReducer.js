import actionTypes from "@actionTypes";

const modalReducer = (
  state = {
    isShow: false,
    title: "",
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
        title: action.payload.title || "",
        type: action.payload.type || "alert",
        size: action.payload.size || "modal-sm",
        isStatic: action.payload.isStatic || false
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isShow: false,
        title: "",
        type: "alert",
        size: "modal-sm",
        isStatic: false
      };
    default:
      return state;
  }
};
export default modalReducer;

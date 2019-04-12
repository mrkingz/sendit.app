import actionTypes from "../actions/actionTypes";

const parcelReducer = (
  state = {
    parcel: null,
    isEditing: false,
    editorType: null
  },
  action
) => {
  switch (action.type) {
    case actionTypes.START_DETAILS_VIEW:
      return {
        ...state,
        editorType: null,
        parcel: action.payload.parcel
      };
    case actionTypes.STOP_DETAILS_VIEW:
      return {
        ...state,
        editorType: null,
        parcel: null
      };
    case actionTypes.EDIT_LOCATION:
      return {
        ...state,
        editorType: action.payload.editorType,
        isEditing: true
      };
    default:
      return state;
  }
};
export default parcelReducer;

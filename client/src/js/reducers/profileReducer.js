import actionTypes from "../actions/actionTypes";

const profileReducer = (
  state = {
    isAuthenticated: false,
    newPhoto: "",
    user: {}
  },
  action
) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user
      };
    case actionTypes.TEMP_PHOTO_UPLOAD:
      return {
        ...state,
        newPhoto: action.payload.photoURL
      };
    case actionTypes.LOGOUT_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      };
    default:
      return state;
  }
};
export default profileReducer;

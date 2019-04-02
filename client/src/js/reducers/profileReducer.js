import actionTypes from "@actionTypes";

const profileReducer = (
  state = {
    isAuthenticated: false,
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

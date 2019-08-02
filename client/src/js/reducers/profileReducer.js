import actionTypes from "../actions/actionTypes";

const initialState = {
  isAuthenticated: false,
  user: {}
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload.user }
      };
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

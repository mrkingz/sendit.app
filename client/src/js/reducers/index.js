import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  messageReducer,
  signUpReducer
});
export default rootReducer;

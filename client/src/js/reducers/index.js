import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import messageReducer from "./messageReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  messageReducer,
  signUpReducer,
  profileReducer
});
export default rootReducer;

import { combineReducers } from "redux";
import signUpReducer from "./signUpReducer";
import messageReducer from "./messageReducer";
import profileReducer from "./profileReducer";
import processingReducer from "./processingReducer";
import modalReducer from "./modalReducer";

const rootReducer = combineReducers({
  messageReducer,
  signUpReducer,
  profileReducer,
  processingReducer,
  modalReducer
});
export default rootReducer;

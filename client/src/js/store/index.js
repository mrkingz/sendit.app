import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers";

let enhancers = [];

const env = process.env.NODE_ENV || "development";

if (env !== "production") {
  enhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
}

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(rootReducer, enhancers);
export default store;

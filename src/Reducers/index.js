import { combineReducers } from "redux";

import { authentication } from "./AuthReducer";
import { alert } from "./AlertReducer";
const rootReducer = combineReducers({
  authentication,
  alert
});

export default rootReducer;

import { combineReducers } from "redux";
import { userData } from "./UserData";

export const rootReducer = combineReducers({
  userData: userData,
});

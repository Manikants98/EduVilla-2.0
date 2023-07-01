import { rootReducer } from "./Redux/Reducer";
import { createStore } from "redux";

export const Store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

import { combineReducers } from "redux";
import groupReducer from "./group_reducer";
import authReducer from "./authReducer";
// import GroupReducer from './newsReducer';

const appReducer = combineReducers({
    groupReducer,
    authReducer,

});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
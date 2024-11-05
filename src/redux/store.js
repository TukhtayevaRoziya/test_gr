import { createStore, applyMiddleware } from "redux";
import {thunk} from "redux-thunk";
import rootReducer from "./reducers/reducers";

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(...middleware)
);

window.store = store;


// store.subscribe(() => {
//   let previousState = currentState;
//   currentState = store.getState();
//   if (previousState.authReducer.token !== currentState.authReducer.token) {
//     const token = currentState.authReducer.token;
//     authToken(token);
//   }
// });

export default store;

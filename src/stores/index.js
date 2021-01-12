import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import todoReducer from "./reducers/todoReducer";
import formReducer from "./reducers/formReducer";

const rootReducer = combineReducers({
  todoState: todoReducer,
  formState: formReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

store.subscribe(() => console.warn("cek state store", store.getState()));

export default store;

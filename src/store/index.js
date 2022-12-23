import { createStore, combineReducers, applyMiddleware } from "redux";

import ReduxThunk from "redux-thunk";

import { widgetsReducer } from "./modules/widgets/reducer";

const reducers = combineReducers({
  widgets: widgetsReducer,
});

const store = createStore(reducers, applyMiddleware(ReduxThunk));

export default store;

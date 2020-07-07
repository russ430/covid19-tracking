import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import usReducer from '../reducers/us';
import statesReducer from '../reducers/states';

const rootReducer = combineReducers({
  us: usReducer,
  states: statesReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

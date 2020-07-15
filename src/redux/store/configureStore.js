import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from '../reducers/data';
import metaReducer from '../reducers/meta';
import selectedReducer from '../reducers/selected';

const rootReducer = combineReducers({
  data: dataReducer,
  meta: metaReducer,
  selected: selectedReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

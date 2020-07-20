import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from '../reducers/data';
import metaReducer from '../reducers/meta';
import selectedReducer from '../reducers/selected';
import resourcesReducers from '../reducers/resources';

const rootReducer = combineReducers({
  data: dataReducer,
  meta: metaReducer,
  selected: selectedReducer,
  resources: resourcesReducers,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

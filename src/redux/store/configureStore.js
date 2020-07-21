import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import dailyDataReducer from '../reducers/dailyData';
import metaReducer from '../reducers/meta';
import selectedReducer from '../reducers/selected';
import resourcesReducers from '../reducers/resources';
import currentDataReducer from '../reducers/currentData';

const rootReducer = combineReducers({
  dailyData: dailyDataReducer,
  meta: metaReducer,
  selected: selectedReducer,
  resources: resourcesReducers,
  currentData: currentDataReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import dailyDataReducer from '../reducers/dailyData';
import metaReducer from '../reducers/meta';
import selectedReducer from '../reducers/selected';
import resourcesReducers from '../reducers/resources';
import currentDataReducer from '../reducers/currentData';
import graphReducer from '../reducers/graph';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  dailyData: dailyDataReducer,
  meta: metaReducer,
  selected: selectedReducer,
  resources: resourcesReducers,
  currentData: currentDataReducer,
  graph: graphReducer,
});

export default function configureStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
  );
  return store;
}

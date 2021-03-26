import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'

let composeEnhancers = compose;
if (window) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || composeEnhancers;
}

export default function(useLocalStorage) {
  const preloadedState = useLocalStorage && localStorage.reduxState ? JSON.parse(localStorage.reduxState) : undefined;
  const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(ReduxThunk)));
  if (useLocalStorage) {
    store.subscribe(() => localStorage.reduxState = JSON.stringify(store.getState()));
  }
  return store;
};

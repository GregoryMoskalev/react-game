import {createStore} from 'redux';
import reducer from './reducers'

const store = createStore(
  reducer,
  localStorage.reduxState ? JSON.parse(localStorage.reduxState) : null,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

store.subscribe(() => localStorage.reduxState = JSON.stringify(store.getState()));

export default store;

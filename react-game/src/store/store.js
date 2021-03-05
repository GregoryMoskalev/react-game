import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers'
import ReduxThunk from 'redux-thunk'

const preloadedState = localStorage.reduxState ? JSON.parse(localStorage.reduxState) : null;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, preloadedState, composeEnhancers(applyMiddleware(ReduxThunk)));

store.subscribe(() => localStorage.reduxState = JSON.stringify(store.getState()));

export default store;

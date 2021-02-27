
import { createStore } from 'redux';

const initialState = {
  settings: {
    audioVolume: {
      sound: 0.3,
      music: .0,
    },
    bugs: 10
  }
}

const reducer = (state, action) => state;

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

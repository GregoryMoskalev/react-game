import {createStore} from 'redux';

const initialState = {
  settings: {
    audioVolume: {
      sound: 0.3,
      music: .0,
    },
    difficulty: 'junior'
  },
  board: {
    field: [
      [
        {value: 1, open: false, flag: false},
        {value: 'B', open: false, flag: false},
      ],
      [
        {value: 'B', open: false, flag: false},
        {value: 8, open: false, flag: false},
      ]
    ],
  },
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'DIFFICULTY_CHANGE':
      return {
        ...state,
        settings: {
          ...state.settings,
          difficulty: action.payload
        }
      }
    case 'VOLUME_SETTING_CHANGE':
      const {soundType, level} = action.payload;
      return {
        ...state,
        settings: {
          ...state.settings,
          audioVolume: {
            ...state.settings.audioVolume,
            [soundType]: level
          }
        }
      }
    case 'OPEN_CELL':
    case 'FLAG_CELL':
      const {row, col} = action.payload;
      const newField = [...state.board.field];
      newField[row] = [...newField[row]]
      let cell = {...newField[row][col]};
      newField[row][col] = cell;
      if (!cell.open && !cell.flag) {
        if (action.type === 'OPEN_CELL') {
          cell.open = true;
        } else if (action.type === 'FLAG_CELL') {
          cell.flag = true;
        }
      }
      return {
        ...state,
        board: {
          ...state.board,
          field: newField,
        }
      }
    case 'NEW_GAME':
      return {
        ...state,
        board: {
          ...state.board,
          field: initialState.board.field
        }
      }
    default:
      return state;
  }
};

export default createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

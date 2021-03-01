import {createStore} from 'redux';
import {cellStr, expandIfEmpty} from '../utils/utils'

const initialState = {
  settings: {
    audioVolume: {
      sound: 0.3,
      music: .05,
    },
    difficulty: 'junior'
  },
  board: {
    bang: false,
    win: false,
    field: {
      rows: 9,
      columns: 9,
      bugs: ['0x0', '1x1'],
      opened: ['8x8'],
      flags: ['0x0'],
    },
  },
}

function handleOpen(boardState, {row, col}) {
  const {field} = boardState;
  const toOpen = cellStr(row, col);
  if (field.opened.includes(toOpen) || field.flags.includes(toOpen)) {
    return boardState;
  }

  const newOpened = [...new Set([...field.opened, toOpen,...expandIfEmpty(field, row, col)])];
  const newBoard = {
    ...boardState,
    field: {
      ...field,
      opened: newOpened
    }
  };
  if (field.bugs.includes(toOpen)) {
    newBoard.bang = true;
  } else {
    let notOpen = field.rows * field.columns - newOpened.length;
    if (notOpen === field.bugs.length) {
      newBoard.win = true;
      newBoard.field.flags = field.bugs; // auto open remaining
    }
  }
  return newBoard;
}

function handleFlag(boardState, {row, col}) {
  const {field} = boardState;
  const toFlag = cellStr(row, col);
  if (field.opened.includes(toFlag)) {
    return boardState;
  }
  let newFlags;
  if (field.flags.includes(toFlag)) {
    // unflag
    newFlags = field.flags.filter(f => f !== toFlag);
  } else if (field.flags.length >= field.bugs.length) {
    newFlags = field.flags; // no flags left
  } else {
    newFlags = [...field.flags, toFlag];
  }
  return {
    ...boardState,
    field: {
      ...field,
      flags: newFlags
    }
  }
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
      return {
        ...state,
        board: handleOpen(state.board, action.payload)
      }
    case 'FLAG_CELL':
      return {
        ...state,
        board: handleFlag(state.board, action.payload)
      }
    case 'NEW_GAME':
      return {
        ...state,
        board: initialState.board
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

import seedrandom from "seedrandom";
import {cellStr, expandIfEmpty} from "../../commons/gameLogic";

const difficulties = {
  junior: {rows: 9, columns: 9, bugs: 10},
  middle: {rows: 16, columns: 16, bugs: 40},
  senior: {rows: 30, columns: 16, bugs: 99},
}

const initialState = {
  bang: false,
  win: false,
  startedAt: Date.now(),
  field: {
    rows: 9,
    columns: 9,
    bugs: [],
    opened: [],
    flags: [],
  },
};

function randomField(difficulty, seed) {
  const rnd = seedrandom(seed);
  const {rows, columns, bugs} = difficulties[difficulty] || difficulties.junior;
  const bugSet = new Set();

  function randomInt(lessThan) {
    return Math.floor(rnd.quick() * lessThan);
  }

  while (bugSet.size < bugs) {
    bugSet.add(cellStr(randomInt(rows), randomInt(columns)));
  }

  return {rows, columns, bugs: [...bugSet], opened: [], flags: []};
}

function handleOpen(boardState, {row, col, timestamp}) {
  const {field} = boardState;
  const toOpen = cellStr(row, col);
  if (field.opened.includes(toOpen) || field.flags.includes(toOpen)) {
    return boardState;
  }

  const newOpened = [...new Set([...field.opened, toOpen, ...expandIfEmpty(field, row, col)])];
  const newBoard = {
    ...boardState,
    field: {
      ...field,
      opened: newOpened
    }
  };
  if (field.opened.length === 0) {
    newBoard.startedAt = timestamp;
  }
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
  if (field.opened.length === 0) {
    newFlags = field.flags; // game starts from opening, not flag
  } else if (field.flags.includes(toFlag)) {
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

function handleNewGame(state, {seed, difficulty}) {
  return {
    ...initialState,
    field: randomField(difficulty, seed)
  };
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_CELL':
      return handleOpen(state, action.payload);
    case 'FLAG_CELL':
      return handleFlag(state, action.payload);
    case 'NEW_GAME':
      return handleNewGame(state, action.payload)
    default:
      return state;
  }
}
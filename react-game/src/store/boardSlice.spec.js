import boardReducer from "./reducers/boardReducer";
import boardActions from "./boardActions";
import _set from 'lodash/fp/set';
import {cellStr} from "../commons/gameLogic";

const initBoard = boardReducer(undefined, {type: 'NEW_GAME', payload: {seed: 1, difficulty: 'junior'}});
const boardWithOneBug = _set('field.bugs')(['0x0'])(initBoard);

describe('FLAG_CELL action', () => {

  const flag = boardActions.onFlag;
  const open = boardActions.onOpen;

  it("has effect only after at least one cell is open", () => {
    let currentBoard = boardReducer(boardWithOneBug, flag(0, 0));
    expect(currentBoard).toEqual(boardWithOneBug);

    currentBoard = boardReducer(currentBoard, open(1, 1));
    currentBoard = boardReducer(currentBoard, flag(0, 0));

    expect(currentBoard).toMatchObject({
      field: {
        flags: ['0x0'],
        opened: ['1x1']
      }
    })
  })

  it("can flag any not open cell", () => {
    let currentBoard = boardReducer(boardWithOneBug, open(1, 1));
    expect(currentBoard.field.opened).toEqual(['1x1']); // ensure no auto expansion

    const {rows, columns} = initBoard.field;
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        if (row === 1 && col === 1) {
          continue;
        }

        const boardWithFlag = boardReducer(currentBoard, flag(row, col));
        expect(boardWithFlag.field.flags).toEqual([cellStr(row, col)])
      }
    }
  })
});

import boardReducer from "./boardReducer";

const initialState = boardReducer(undefined, {type: 'NOOP'});

describe("boardReducer", () => {
  describe("given NEW_GAME action", () => {
    const action = {type: 'NEW_GAME', payload: {seed: 1, difficulty: 'junior'}};

    it('generates random but predictable field', () => {
      const state = boardReducer(initialState, action);
      expect(state.field.bugs).toEqual([
        "1x3", "2x2", "2x8", "3x1", "7x7",
        "5x0", "8x1", "6x7", "4x1", "3x7",
      ]);
      expect(state).toEqual(boardReducer(state, action));
    });
  })
})
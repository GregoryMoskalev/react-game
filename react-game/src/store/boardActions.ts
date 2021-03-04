export default {
  onFlag: (row: number, col: number) => ({type: 'FLAG_CELL', payload: {row, col}}),
  onOpen: (row: number, col: number) => ({type: 'OPEN_CELL', payload: {row, col, timestamp: Date.now()}}),
  onNewGame: () => ({type: 'NEW_GAME', payload: ({seed: Math.random()})}),
}
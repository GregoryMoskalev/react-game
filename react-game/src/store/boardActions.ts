export default {
  onFlag: (row: number, col: number) => ({type: 'FLAG_CELL', payload: {row, col}}),
  onOpen: (row: number, col: number) => ({type: 'OPEN_CELL', payload: {row, col}}),
  onNewGame: () => ({type: 'NEW_GAME'}),
}
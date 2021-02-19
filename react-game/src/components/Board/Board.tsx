import React, { useState } from 'react';
import Cell from '../Cell/Cell';
import {
  createMatrix,
  createRandomListOfCoordinats,
  plantBugs,
  addProperties,
  openEmptyTiles,
} from '../../utils/utils';
import './Board.scss';

const ROWS = 10;
const COLUMNS = 10;

const emptyBoard = addProperties(createMatrix(ROWS, COLUMNS, 0));
const listOfBombs = createRandomListOfCoordinats(10, ROWS, COLUMNS);
const field = plantBugs(emptyBoard, listOfBombs);

const Board: React.FC = () => {
  const [board, setBoardProps] = useState(field);

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!board[x][y].flag) {
      if (board[x][y].value === 'B') alert('You lose!');
      let arr = [...board];
      arr[x][y].open = true;
      arr = openEmptyTiles(x, y, arr);
      setBoardProps(arr);
    }
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!board[x][y].open) {
      const arr = [...board];
      arr[x][y].flag = !arr[x][y].flag;
      setBoardProps(arr);
    }
  };

  return (
    <div className="Board">
      {board.map((row, x) => {
        return (
          <div key={x} className="Board-row">
            {row.map((cell, y) => {
              return (
                <Cell
                  key={`${x}-${y}`}
                  cell={cell}
                  handleClick={(e) => handleClick(x, y, e)}
                  handleContextMenu={(e) => handleContextMenu(x, y, e)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

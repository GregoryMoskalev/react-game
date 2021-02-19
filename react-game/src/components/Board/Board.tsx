import React, { useState, useEffect } from 'react';
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
const BOMBS = 10;

const emptyBoard = addProperties(createMatrix(ROWS, COLUMNS, 0));
const listOfBombs = createRandomListOfCoordinats(BOMBS, ROWS, COLUMNS);
const field = plantBugs(emptyBoard, listOfBombs);

const Board: React.FC = () => {
  const [board, setBoardProps] = useState(field);
  const [flagCounter, setFlagCounter] = useState(BOMBS);

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!board[x][y].flag) {
      if (board[x][y].value === 'B') alert('You lose!');
      const arr = [...board];
      arr[x][y].open = true;
      openEmptyTiles(x, y, arr);
      setBoardProps(arr);
    }
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!board[x][y].open && flagCounter > 0) {
      const arr = [...board];
      setFlagCounter(arr[x][y].flag ? flagCounter + 1 : flagCounter - 1);
      arr[x][y].flag = !arr[x][y].flag;
      setBoardProps(arr);
    }
  };

  useEffect(() => {
    if (flagCounter === 0) {
      if (
        listOfBombs.every((e) => {
          const [x, y] = e.split('-').map((e) => Number(e));
          return field[x][y].flag;
        })
      ) {
        alert('you win!');
      }
    }
  });

  return (
    <div className="Board">
      <p>flags:{flagCounter}</p>
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

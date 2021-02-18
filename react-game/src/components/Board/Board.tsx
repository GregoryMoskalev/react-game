import React from 'react';
import Cell from '../Cell/Cell';
import { createMatrix, createRandomListOfCoordinats, plantBugs } from '../../utils/utils';
import './Board.scss';

const ROWS = 10;
const COLUMNS = 10;

const emptyBoard = createMatrix(ROWS, COLUMNS);
const listOfBombs = createRandomListOfCoordinats(10, ROWS, COLUMNS);
const board = plantBugs(emptyBoard, listOfBombs);

const Board: React.FC = () => {
  console.log(createRandomListOfCoordinats(10, ROWS, COLUMNS));

  return (
    <div className="Board">
      {board.map((row, x) => {
        return (
          <div key={x} className="Board-row">
            {row.map((cell, y) => {
              return <Cell key={`${x}-${y}`} cell={cell} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

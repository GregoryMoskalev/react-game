import React from 'react';
import Cell from '../Cell/Cell';
import createMatrix from '../../utils/utils';
import './Board.scss';

const ROWS = 10;
const COLUMNS = 10;

const board = createMatrix(ROWS, COLUMNS);

const Board = () => {
  return (
    <div className="Board">
      {board.map((row, x) => {
        return (
          <div key={x} className="Board-row">
            {row.map((cell, y) => {
              return <Cell key={`${x}-${y}`} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;

// {board.map((row, x) => {
//   <div key={row[0].id} className="Board-row">
//     {row.map((cell, y) => {
//       <Cell key={cell.id} />;
//     })}
//   </div>;
// })}

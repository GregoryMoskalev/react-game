import React, { useState, useEffect } from 'react';
import Cell from '../Cell/Cell';
import { plantBugs, openEmptyTiles } from '../../utils/utils';
import './Board.scss';

const rows = 10;
const columns = 10;
const bugs = 20;

const [field, arrOfBugs] = plantBugs(rows, columns, bugs);

const Board: React.FC = () => {
  const [board, setBoardProps] = useState(field);
  const [flagCounter, setFlagCounter] = useState(bugs);
  const [listOfBugs, setListOfBugs] = useState(arrOfBugs);
  const [heading, setHeading] = useState('Bugswapper');

  const onLose = () => {
    // open all bugs
    listOfBugs.forEach((e) => {
      const [x, y] = e;
      board[x][y].open = true;
    });
    // msg you lose
    setHeading('You lose! 🤣');
  };

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!board[x][y].flag) {
      if (board[x][y].value === 'B') {
        onLose();
      }
      const arr = [...board];
      arr[x][y].open = true;
      openEmptyTiles(x, y, arr);
      setBoardProps(arr);
    }
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!board[x][y].open && (flagCounter > 0 || board[x][y].flag)) {
      const arr = [...board];
      setFlagCounter(arr[x][y].flag ? flagCounter + 1 : flagCounter - 1);
      arr[x][y].flag = !arr[x][y].flag;
      setBoardProps(arr);
    }
  };

  const checkWin = () => {
    if (
      listOfBugs.every((e) => {
        const [x, y] = e;
        return field[x][y].flag;
      })
    ) {
      alert('you win! 🤗');
    }
  };

  useEffect(() => {
    if (flagCounter === 0) {
      checkWin();
    }
  });

  return (
    <div className="Board">
      <h1>{heading}</h1>
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

import React, { useState, useEffect } from 'react';
import Cell, { Flag } from '../Cell/Cell';
import { plantBugs, openEmptyTiles } from '../../utils/utils';
import './Board.scss';

const r = 9;
const c = 9;
const b = 10;

const [field, arrOfBugs] = plantBugs(r, c, b);

const Board: React.FC = () => {
  const [rows, setRows] = useState(r);
  const [columns, setColumns] = useState(c);
  const [bugs, setBugs] = useState(b);
  const [board, setBoardProps] = useState(field);
  const [flagCounter, setFlagCounter] = useState(b);
  const [listOfBugs, setListOfBugs] = useState(arrOfBugs);
  const [button, setButton] = useState('🙂');

  const onLose = () => {
    // open all bugs
    listOfBugs.forEach((e) => {
      const [x, y] = e;
      board[x][y].open = true;
    });
  };

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    let button = '🙂';
    if (!board[x][y].flag) {
      if (board[x][y].value === 'B') {
        onLose();
        button = '💀';
      }
      const arr = [...board];
      arr[x][y].open = true;
      openEmptyTiles(x, y, arr);
      setBoardProps(arr);
      setButton('😯');
      setTimeout(() => {
        setButton(button);
      }, 200);
    }
  };

  const handleNewGame = () => {
    const [field, arrOfBugs] = plantBugs(rows, columns, bugs);
    setListOfBugs(arrOfBugs);
    setBoardProps(field);
    setButton('🙂');
    setFlagCounter(bugs);
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
      setButton('🥳');
    }
  };

  useEffect(() => {
    if (flagCounter === 0) {
      checkWin();
    }
  });

  return (
    <div className="Board">
      <h1 className="heading h-1">
        <div className="material-icons">pest_control</div>Bugsweeper
      </h1>
      <button className="NewGame" onClick={handleNewGame}>
        {button}
      </button>
      <div className="flag-counter">
        <Flag flag={true} />
        <span className="counter">{flagCounter}</span>
      </div>
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

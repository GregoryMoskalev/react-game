import React, { useState, useEffect, useRef } from 'react';
import Cell, { Flag } from '../Cell/Cell';
import { plantBugs, openEmptyTiles } from '../../utils/utils';
import useStateAndLS from '../../hooks/useStateAndLS';
import './Board.scss';

const properties = JSON.parse(localStorage.getItem('bugsweeper-props') || '');

const r = properties.rows || 9;
const c = properties.columns || 9;
const b = properties.bugs || 10;

const [field, arrOfBugs] =
  properties.board && properties.listOfBugs
    ? [properties.board, properties.listOfBugs]
    : plantBugs(r, c, b);

const Board: React.FC<any> = (props) => {
  const [board, setBoardProps] = useState(field);
  const [flagCounter, setFlagCounter] = useState(properties.flagCounter || b);
  const [listOfBugs, setListOfBugs] = useState(arrOfBugs);
  const [button, setButton] = useStateAndLS('🙂', 'bugsweeper-btn');
  const onMountRender = useRef(true);

  const onLose = () => {
    // open all bugs
    listOfBugs.forEach((e: number[]) => {
      const [x, y] = e;
      board[x][y].open = true;
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('bugsweeper-props', JSON.stringify({ board, listOfBugs, flagCounter }));
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
    const [field, arrOfBugs] = plantBugs(
      props.difficulty.rows,
      props.difficulty.columns,
      props.difficulty.bugs,
    );
    setListOfBugs(arrOfBugs);
    setBoardProps(field);
    setButton('🙂');
    setFlagCounter(props.difficulty.bugs);
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
      listOfBugs.every((e: number[]) => {
        const [x, y] = e;
        return field[x][y].flag;
      })
    ) {
      setButton('🥳');
    }
  };

  useEffect(
    () => {
      console.count('USEEFFECT');

      saveToLocalStorage();
      if (flagCounter === 0) {
        checkWin();
      }
    },
    [flagCounter, board],
  );

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
      <div>
        {board.map((row: [], x: number) => {
          return (
            <div key={x} className="Board-row">
              {row.map((cell, y: number) => {
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
    </div>
  );
};

export default Board;

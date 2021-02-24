import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cell, { Flag } from '../Cell/Cell';
import { plantBugs, openEmptyTiles } from '../../utils/utils';
import useStateAndLS from '../../hooks/useStateAndLS';
import './Board.scss';

const properties =
  'bugsweeper-props' in localStorage
    ? JSON.parse(localStorage.getItem('bugsweeper-props') || '')
    : '';

const r = properties.rows || 9;
const c = properties.columns || 9;
const b = properties.bugs || 10;

const [field, arrOfBugs] =
  properties.board && properties.listOfBugs
    ? [properties.board, properties.listOfBugs]
    : plantBugs(r, c, b);

const Board: React.FC<any> = (props) => {
  const [state, setState] = useState({
    field,
    flagCounter: properties.flagCounter || b,
    listOfBugs: arrOfBugs,
  });
  const [button, setButton] = useStateAndLS('🙂', 'bugsweeper-btn');

  useEffect(
    () => {
      console.count('USEEFFECT');

      saveToLocalStorage();
      if (state.flagCounter === 0) {
        checkWin();
      }
    },
    [state.flagCounter, state.field],
  );
  const onLose = () => {
    // open all bugs
    state.listOfBugs.forEach((e: number[]) => {
      const [x, y] = e;
      state.field[x][y].open = true;
    });
  };

  const saveToLocalStorage = () => {
    localStorage.setItem(
      'bugsweeper-props',
      JSON.stringify({
        board: state.field,
        listOfBugs: state.listOfBugs,
        flagCounter: state.flagCounter,
      }),
    );
  };

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    let button = '🙂';
    if (!state.field[x][y].flag) {
      if (state.field[x][y].value === 'B') {
        onLose();
        button = '💀';
      }
      const arr = [...state.field];
      arr[x][y].open = true;
      openEmptyTiles(x, y, arr);
      setState((prevState) => ({
        ...prevState,
        field: [...arr],
      }));
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
    setButton('🙂');
    setState((prevState) => ({
      ...prevState,
      listOfBugs: arrOfBugs,
      field,
      flagCounter: props.difficulty.bugs,
    }));
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (!state.field[x][y].open && (state.flagCounter > 0 || state.field[x][y].flag)) {
      const arr = [...state.field];
      const counter = arr[x][y].flag ? state.flagCounter + 1 : state.flagCounter - 1;
      arr[x][y].flag = !arr[x][y].flag;
      console.log(counter, state.flagCounter);
      setState((prevState) => ({
        ...prevState,
        flagCounter: counter,
        field: [...arr],
      }));
    }
  };

  const checkWin = () => {
    if (
      state.listOfBugs.every((e: number[]) => {
        const [x, y] = e;
        return field[x][y].flag;
      })
    ) {
      setButton('🥳');
    }
  };

  return (
    <div className="Board">
      <h1 className="heading h-1">
        <div className="material-icons">pest_control</div>Bugsweeper
      </h1>
      <button className="NewGame" onClick={handleNewGame}>
        {button}
      </button>
      <Link to="/settings">Settings</Link>
      <div className="flag-counter">
        <Flag flag={true} />
        <span className="counter">{state.flagCounter}</span>
      </div>
      <div>
        {state.field.map((row: [], x: number) => {
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

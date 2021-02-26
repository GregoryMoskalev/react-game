import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Cell, { Flag } from '../Cell/Cell';
import { plantBugs, openEmptyTiles } from '../../utils/utils';
import useStateAndLS from '../../hooks/useStateAndLS';
import './Board.scss';
import popCatSound from '../../assets/pop_cat.mp3';
import pigPissdSound from '../../assets/Pigpissd.mp3';
import winS from '../../assets/b146dc8d75d05f3.mp3';
import rCSound from '../../assets/ffc89ff250028f8.mp3';
import music1 from '../../assets/brought-to-you-by-a-falling-bob-omb-by-0x10.mp3';

const Board: React.FC<any> = (props) => {
  const clickSound = new Audio(popCatSound);
  const rClickSound = new Audio(rCSound);
  const loseSound = new Audio(pigPissdSound);
  const winSound = new Audio(winS);
  const song1 = new Audio(music1);
  const [state, setState] = useStateAndLS(
    {
      ...plantBugs(props.rows, props.columns, props.bugs),
      flagCounter: props.bugs,
    },
    'bugsweeper-save',
  );
  const [button, setButton] = useStateAndLS('🙂', 'bugsweeper-btn');

  useEffect(() => {
    song1.addEventListener(
      'ended',
      function() {
        this.currentTime = 0;
        if (props.audioVolume.music) {
          this.play();
        }
      },
      false,
    );
    if (props.audioVolume.music) {
      song1.volume = props.audioVolume.music;
      song1.play();
    }
    return function cleanup() {
      song1.pause();
    };
  }, []);

  useEffect(
    () => {
      console.count('USEEFFECT');

      if (state.flagCounter === 0) {
        checkWin();
      }
    },
    [state.flagCounter, state.field],
  );
  const onLose = () => {
    if (props.audioVolume.sound) {
      loseSound.volume = props.audioVolume.sound > 0.3 ? 0.3 : props.audioVolume.sound;
      loseSound.play();
    }
    // open all bugs
    state.listOfBugs.forEach((e: number[]) => {
      const [x, y] = e;
      state.field[x][y].open = true;
    });
  };

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    let button = '🙂';
    if (!state.field[x][y].flag) {
      if (state.field[x][y].value === 'B') {
        onLose();
        button = '💀';
      } else if (!state.field[x][y].open) {
        if (props.audioVolume.sound) {
          clickSound.volume = props.audioVolume.sound;
          clickSound.play();
        }
        setButton('😯');
      }
      const arr = [...state.field];
      arr[x][y].open = true;
      openEmptyTiles(x, y, arr);
      setState({
        listOfBugs: state.listOfBugs,
        flagCounter: state.flagCounter,
        field: [...arr],
      });

      setTimeout(() => {
        setButton(button);
      }, 200);
    }
  };

  const handleNewGame = () => {
    setButton('🙂');
    setState({
      ...plantBugs(props.rows, props.columns, props.bugs),
      flagCounter: props.bugs,
    });
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    rClickSound.volume = props.audioVolume.sound;
    rClickSound.currentTime = 0;
    rClickSound.play();
    if (!state.field[x][y].open && (state.flagCounter > 0 || state.field[x][y].flag)) {
      const arr = [...state.field];
      const counter = arr[x][y].flag ? state.flagCounter + 1 : state.flagCounter - 1;
      arr[x][y].flag = !arr[x][y].flag;
      console.log(counter, state.flagCounter);
      setState({
        listOfBugs: state.listOfBugs,
        flagCounter: counter,
        field: [...arr],
      });
    }
  };

  const checkWin = () => {
    if (
      state.listOfBugs.every((e: number[]) => {
        const [x, y] = e;
        return state.field[x][y].flag;
      })
    ) {
      winSound.play();
      setButton('🥳');
    }
  };

  return (
    <div className="Board">
      <h1 className="heading h-1">Bugsweeper</h1>
      <div className="Board-controls">
        <div className="Board-stats">
          <div className="Board-timer">04:00</div>
          <button className="NewGame" onClick={handleNewGame}>
            {button}
          </button>
          <div className="flag-counter">
            <Flag flag={true} />
            <span className="counter">{state.flagCounter}</span>
          </div>
        </div>
        <Link className="material-icons settings-btn" to="/settings">
          settings
        </Link>
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

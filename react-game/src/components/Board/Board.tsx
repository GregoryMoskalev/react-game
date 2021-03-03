import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

import languages from '../../languages/languages';
import { LanguageContext } from '../../contexts/LanguageContext';
import Cell, { Flag } from '../Cell/Cell';
import { plantBugs, openEmptyTiles } from '../../utils/utils';
import useStateAndLS from '../../hooks/useStateAndLS';
import useStateAndLSForTimer from '../../hooks/useStateAndLSForTimer';
import './Board.scss';
//audio
import popCatSound from '../../assets/pop_cat.mp3';
import onLoseSound from '../../assets/Wilhelm_Scream.mp3';
import winS from '../../assets/b146dc8d75d05f3.mp3';
import rCSound from '../../assets/ffc89ff250028f8.mp3';
import music1 from '../../assets/brought-to-you-by-a-falling-bob-omb-by-0x10.mp3';

const Board: React.FC<any> = (props) => {
  const langContext = useContext(LanguageContext);
  const clickSound = new Audio(popCatSound);
  const rClickSound = new Audio(rCSound);
  const loseSound = new Audio(onLoseSound);
  const winSound = new Audio(winS);
  const song1 = new Audio(music1);
  const [selectedCell, setSelectedCell] = useState([0, 0]);

  const [timer, startTimer, stopTimer] = useStateAndLSForTimer();
  const [state, setState] = useStateAndLS(
    {
      ...plantBugs(props.rows, props.columns, props.bugs),
      flagCounter: props.bugs,
    },
    'bugsweeper-save',
  );
  const [button, setButton] = useStateAndLS('🙂', 'bugsweeper-btn');

  useEffect(() => {
    // чтобы не плодить сущности проверяю морду, если она не дефолтная - игра чем то закончилась и таймер пускать заново не надо
    if (button === '🙂') {
      startTimer(false);
    }

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
      song1.removeEventListener(
        'ended',
        function() {
          this.currentTime = 0;
          if (props.audioVolume.music) {
            this.play();
          }
        },
        false,
      );
      song1.pause();
      stopTimer();
    };
  }, []);

  useEffect(
    () => {
      const keyboardHandler = (e: KeyboardEvent) => {
        const { key } = e;

        if (key === 'ArrowDown') {
          setSelectedCell((prevState) => {
            return [(prevState[0] + 1) % props.rows, prevState[1]];
          });
        } else if (key === 'ArrowUp') {
          setSelectedCell((prevState) => {
            const x = (prevState[0] - 1) % props.rows;
            return [x >= 0 ? x : props.rows - 1, prevState[1]];
          });
        } else if (key === 'ArrowLeft') {
          setSelectedCell((prevState) => {
            const y = (prevState[1] - 1) % props.columns;
            return [prevState[0], y >= 0 ? y : props.columns - 1];
          });
        } else if (key === 'ArrowRight') {
          setSelectedCell((prevState) => {
            return [prevState[0], (prevState[1] + 1) % props.columns];
          });
        } else if (e.key === 'n') {
          handleNewGame();
        }
      };

      document.addEventListener('keydown', keyboardHandler);
      return () => {
        document.removeEventListener('keydown', keyboardHandler);
      };
    },
    [selectedCell],
  );

  useEffect(
    () => {
      if (state.flagCounter === 0) {
        checkWin();
      }
    },
    [state.flagCounter, state.field],
  );

  const isGameEnded = () => {
    return button === '💀' || button === '🥳';
  };

  const onLose = () => {
    if (isGameEnded()) return;
    if (props.audioVolume.sound) {
      loseSound.volume = props.audioVolume.sound * 0.3;
      loseSound.play();
      stopTimer();
    }
    state.listOfBugs.forEach((e: number[]) => {
      const [x, y] = e;
      state.field[x][y].open = true;
    });
  };

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (isGameEnded()) return;
    let btn = '🙂';
    if (!state.field[x][y].flag) {
      if (state.field[x][y].value === 'B') {
        onLose();
        btn = '💀';
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
        setButton(btn);
      }, 200);
    }
  };

  const handleNewGame = () => {
    setState({
      ...plantBugs(props.rows, props.columns, props.bugs),
      flagCounter: props.bugs,
    });
    startTimer(true);
    setButton('🙂');
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    if (isGameEnded()) return;
    if (!state.field[x][y].open && (state.flagCounter > 0 || state.field[x][y].flag)) {
      rClickSound.volume = props.audioVolume.sound;
      rClickSound.currentTime = 0;
      rClickSound.play();
      const arr = [...state.field];
      const counter = arr[x][y].flag ? state.flagCounter + 1 : state.flagCounter - 1;
      arr[x][y].flag = !arr[x][y].flag;
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
      stopTimer();
    }
  };

  const convertTime = (s: number) => {
    const min = String(Math.floor(s / 60));
    const sec = String((s % 60).toFixed(0));
    return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="Board">
      <h1 className="heading h-1">{languages[langContext!.lang].heading}</h1>
      <button className="fullscreen-btn material-icons" onClick={toggleFullScreen}>
        fullscreen
      </button>
      <div className="Board-controls">
        <div className="Board-stats">
          <div className="Board-timer">{convertTime(timer)}</div>
          <button className="NewGame" onClick={handleNewGame}>
            {button}
          </button>
          <div className="flag-counter">
            <Flag flag={true} />
            <span className="counter">{state.flagCounter}</span>
          </div>
        </div>
        <Link onClick={() => stopTimer()} className="material-icons settings-btn" to="/settings">
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
                    isExpert={props.bugs > 40}
                    selected={x === selectedCell[0] && y === selectedCell[1]}
                    setSelected={() => setSelectedCell([x, y])}
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
      <div className="keybinds">
        <h4>{languages[langContext!.lang].keybinds}</h4>
        <ul className="keybinds-list">
          <li>{languages[langContext!.lang].keybindNewGame}</li>
          <li>{languages[langContext!.lang].keybindUp}</li>
          <li>{languages[langContext!.lang].keybindDown}</li>
          <li>{languages[langContext!.lang].keybindLeft}</li>
          <li>{languages[langContext!.lang].keybindRight}</li>
        </ul>
      </div>
    </div>
  );
};

export default Board;

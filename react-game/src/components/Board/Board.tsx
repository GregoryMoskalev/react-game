import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cell, { Flag } from '../Cell/Cell';
import { plantBugs, openEmptyTiles, FieldOfBugs } from '../../utils/utils';
import './Board.scss';
import popCatSound from '../../assets/pop_cat.mp3';
import onLoseSound from '../../assets/Wilhelm_Scream.mp3';
import winS from '../../assets/b146dc8d75d05f3.mp3';
import rCSound from '../../assets/ffc89ff250028f8.mp3';
import music1 from '../../assets/brought-to-you-by-a-falling-bob-omb-by-0x10.mp3';

const Board: React.FC<any> = (props) => {
  // @ts-ignore
  const dispatch: ((any) => void) = props.dispatch;
  const field = props.field as FieldOfBugs;

  const clickSound = new Audio(popCatSound);
  const rClickSound = new Audio(rCSound);
  const loseSound = new Audio(onLoseSound);
  const winSound = new Audio(winS);
  const song1 = new Audio(music1);

  const [timer, setTimer] = useState('00:00');
  const [timerId, setTimerId] = useState(0);
  const [button, setButton] = useState('🙂');
  const listOfBugs = useMemo(() => {
    const bugs: Array<number[]> = [];
    field.forEach((row, i) => row.forEach((cell, j) => {
      if (cell.value === 'B') {
        bugs.push([i, j]);
      }
    }));
    return bugs;
  }, [field])
  const flagCounter = 4; // TODO: implement

  const onFlag = (row: number, col: number) => dispatch({type: 'FLAG_CELL', payload: {row, col}})
  const onOpen = (row: number, col: number) => dispatch({type: 'OPEN_CELL', payload: {row, col}})
  const onNewGame = () => dispatch({type: 'NEW_GAME'})

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

  const onLose = () => {
    if (props.audioVolume.sound) {
      loseSound.volume = props.audioVolume.sound > 0.3 ? 0.3 : props.audioVolume.sound;
      loseSound.play();
      clearInterval(timerId);
    }
    // open all bugs
    listOfBugs.forEach((e: number[]) => {
      const [x, y] = e;
      field[x][y].open = true;
    });
  };

  const handleClick = (x: number, y: number, e: any) => {
    e.preventDefault();
    let button = '🙂';
    if (!field[x][y].flag) {
      if (field[x][y].value === 'B') {
        onLose();
        button = '💀';
      } else if (!field[x][y].open) {
        if (props.audioVolume.sound) {
          clickSound.volume = props.audioVolume.sound;
          clickSound.play();
        }
        setButton('😯');
      }
      const arr = [...field];
      arr[x][y].open = true;
      openEmptyTiles(x, y, arr);
      //setState({
      //  listOfBugs: state.listOfBugs,
      //  flagCounter: state.flagCounter,
      //  field: [...arr],
      //});

      setTimeout(() => {
        setButton(button);
      }, 200);
    }
  };

  const handleNewGame = () => {
    clearInterval(timerId);
    //@ts-ignore
    setTimerId(time());
    setButton('🙂');
    //setState({
    //  ...plantBugs(props.rows, props.columns, props.bugs),
    //  flagCounter: props.bugs,
    //});
  };

  const handleContextMenu = (x: number, y: number, e: any) => {
    e.preventDefault();
    rClickSound.volume = props.audioVolume.sound;
    rClickSound.currentTime = 0;
    rClickSound.play();
    if (!field[x][y].open && (flagCounter > 0 || field[x][y].flag)) {
      const arr = [...field];
      const counter = arr[x][y].flag ? flagCounter + 1 : flagCounter - 1;
      arr[x][y].flag = !arr[x][y].flag;
      // setState({
      //   listOfBugs: state.listOfBugs,
      //   flagCounter: counter,
      //   field: [...arr],
      // });
    }
  };

  const checkWin = () => {
    if (
      listOfBugs.every((e: number[]) => {
        const [x, y] = e;
        return field[x][y].flag;
      })
    ) {
      winSound.play();
      setButton('🥳');
      clearInterval(timerId);
    }
  };

  const convertTime = (delta: number) => {
    const sec = String(Math.floor((delta / 1000) % 60));
    const min = String(Math.floor((delta / (1000 * 60)) % 60));
    return `${min.padStart(2, '0')}:${sec.padStart(2, '0')}`;
  };

  const time = () => {
    const start = Date.now();
    return setInterval(() => {
      setTimer(convertTime(Date.now() - start));
    }, 100);
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
      <h1 className="heading h-1">Bugsweeper</h1>
      <button className="fullscreen-btn material-icons" onClick={toggleFullScreen}>
        fullscreen
      </button>
      <div className="Board-controls">
        <div className="Board-stats">
          <div className="Board-timer">{timer}</div>
          <button className="NewGame" onClick={onNewGame}>
            {button}
          </button>
          <div className="flag-counter">
            <Flag flag={true} />
            <span className="counter">{flagCounter}</span>
          </div>
        </div>
        <Link className="material-icons settings-btn" to="/settings">
          settings
        </Link>
      </div>

      <div>
        {props.field.map((row: [], rowNum: number) => {
          return (
            <div key={rowNum} className="Board-row">
              {row.map((cell, cellNum: number) => {
                return (
                  <Cell
                    key={`${rowNum}-${cellNum}`}
                    cell={cell}
                    handleClick={() => onOpen(rowNum, cellNum)}
                    handleContextMenu={(e) => {
                      e.preventDefault();
                      onFlag(rowNum, cellNum)
                    }}
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

const mapStateToProps = (state: any) => ({
  audioVolume: state.settings.audioVolume,
  difficulty: state.settings.difficulty,
  field: state.board.field
});
export default connect(mapStateToProps)(Board);

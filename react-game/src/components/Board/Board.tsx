import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cell, { Flag } from '../Cell/Cell';
import { FieldOfBugs } from '../../utils/utils';
import './Board.scss';

// features to implement:
// * remaining flags counter
// * handle lose
// * handle win
// * sound effects
// * music
// * 💀🙂😯
// * timer

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const Board: React.FC<any> = (props) => {
  // @ts-ignore
  const dispatch: ((any) => void) = props.dispatch;
  const field = props.field as FieldOfBugs;
  const timer = '00:00';
  const button = '🙂';
  const flagCounter = 4;
  const onFlag = (row: number, col: number) => dispatch({type: 'FLAG_CELL', payload: {row, col}})
  const onOpen = (row: number, col: number) => dispatch({type: 'OPEN_CELL', payload: {row, col}})
  const onNewGame = () => dispatch({type: 'NEW_GAME'})

  const renderedRows = field.map((row, rowNum) => (
    <div key={rowNum} className="Board-row">
      {row.map((cell, cellNum) => <Cell
        key={`${rowNum}-${cellNum}`}
        cell={cell}
        handleClick={() => onOpen(rowNum, cellNum)}
        handleContextMenu={(e) => {
          e.preventDefault();
          onFlag(rowNum, cellNum)
        }}
      />)}
    </div>
  ));

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
            <Flag flag={true}/>
            <span className="counter">{flagCounter}</span>
          </div>
        </div>
        <Link className="material-icons settings-btn" to="/settings">
          settings
        </Link>
      </div>
      <div className='Board-field'>
        {renderedRows}
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

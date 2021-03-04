import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cell, { Flag } from '../Cell/Cell';
import { cellStr, createBugNumMatrix } from '../../utils/utils';
import boardActions from '../../store/boardActions';
import Timer from './Timer';
import './Board.scss';

// features to implement:
// * emoji for mouseDown
// * bulk open (left+right click on digit)
// * make it impossible to fail at the first open?
// * more typescript

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
};

const Board: React.FC<any> = (props) => {
  const {onNewGame, onFlag, onOpen} = props;
  const {field, bang, win, startedAt} = props;
  const button = bang ? '💀' : win ? '😎' : '🙂';
  const flagCounter = field.bugs.length - field.flags.length;

  const bugNumMatrix = useMemo(
    () => createBugNumMatrix(field.rows, field.columns, field.bugs),
    [field.rows, field.columns, field.bugs]
  );

  const renderedRows = bugNumMatrix.map((row, rowNum) => (
    <div key={rowNum} className="Board-row">
      {row.map((bugsAround, cellNum) => {
        const cellId = cellStr(rowNum, cellNum)
        const open = field.opened.includes(cellId);
        const flag = field.flags.includes(cellId);
        const bug = field.bugs.includes(cellId);
        const cellObj = {
          open: open || bang || win,
          flag: flag || (bug && win),
          value: bug ? 'B' : bugsAround
        };

        return <Cell
          key={cellId}
          cell={cellObj}
          handleClick={() => onOpen(rowNum, cellNum)}
          handleContextMenu={(e) => {
            e.preventDefault();
            onFlag(rowNum, cellNum)
          }}
        />
      })}
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
          <Timer tick={!win && !bang && field.opened.length > 0} start={startedAt}/>
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

const mapDispatchToProps = boardActions;
const mapStateToProps = (state: any) => ({
  audioVolume: state.settings.audioVolume,
  difficulty: state.settings.difficulty,
  field: state.board.field,
  bang: state.board.bang,
  win: state.board.win,
  startedAt: state.board.startedAt,
});
export default connect(mapStateToProps, mapDispatchToProps)(Board);

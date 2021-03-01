import React, { useContext } from 'react';
import { MineThemeContext } from '../../contexts/MineThemeContext';
import { TileProps } from '../../utils/utils';
import './Cell.scss';

interface CellProps {
  cell: TileProps;
  handleClick: (e: any) => void;
  handleContextMenu: (e: any) => void;
}

const Bug: React.FC<{ open: boolean | string | number }> = (props) => {
  const MineTheme = useContext(MineThemeContext);
  return (
    <div className={props.open ? 'material-icons Bug' : 'Bug'}>
      {MineTheme.mine === 'bug' ? 'pest_control' : 'coronavirus'}
    </div>
  );
};

export const Flag: React.FC<{ flag: boolean | string | number }> = (props) => {
  return <div className="Flag material-icons">warning_amber</div>;
};

const Cell: React.FC<CellProps> = (props) => {
  let classList = 'Cell ';
  let content: JSX.Element | string = '';
  if (props.cell.open) {
    classList += 'Cell-open ';
    if (props.cell.value === 'B') {
      classList += 'Cell-bomb';
    }
  }
  if (props.cell.value > 3) {
    classList += 'purple';
  } else if (props.cell.value === 3) {
    classList += 'red';
  } else if (props.cell.value === 2) {
    classList += 'green';
  } else if (props.cell.value === 1) {
    classList += 'blue';
  }

  if (props.cell.value) {
    if (props.cell.value === 'B') {
      content = <Bug open={props.cell.open} />;
    } else {
      content = String(props.cell.value);
    }
  }
  if (props.cell.flag) {
    content = <Flag flag={props.cell.flag} />;
  }

  return (
    <div
      style={{ color: props.cell.open ? '' : 'transparent' }}
      className={classList}
      onClick={props.handleClick}
      onContextMenu={props.handleContextMenu}
    >
      {content}
    </div>
  );
};

export default Cell;

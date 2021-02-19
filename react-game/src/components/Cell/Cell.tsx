import React from 'react';
import { TileProps } from '../../utils/utils';
import './Cell.scss';

interface CellProps {
  cell: TileProps;
  handleClick: (e: any) => void;
  handleContextMenu: (e: any) => void;
}

const Cell: React.FC<CellProps> = (props) => {
  let classList = 'Cell ';
  if (props.cell.flag) {
    classList += 'Cell-flag ';
  } else if (props.cell.open) {
    classList += props.cell.value === 'B' ? 'Cell-bomb ' : 'Cell-open ';
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
  return (
    <div className={classList} onClick={props.handleClick} onContextMenu={props.handleContextMenu}>
      {props.cell.value ? `${props.cell.value}` : ''}
    </div>
  );
};

export default Cell;

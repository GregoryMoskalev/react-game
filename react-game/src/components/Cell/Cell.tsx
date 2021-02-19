import React from 'react';
import './Cell.scss';

interface CellProps {
  cell: number | string;
  handleClick: (e: any) => void;
  handleContextMenu: (e: any) => void;
}

const Cell: React.FC<CellProps> = (props) => {
  return (
    <div className="Cell" onClick={props.handleClick} onContextMenu={props.handleContextMenu}>
      {props.cell ? `${props.cell}` : ''}
    </div>
  );
};

export default Cell;

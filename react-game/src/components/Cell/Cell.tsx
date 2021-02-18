import React from 'react';
import './Cell.scss';

interface CellProps {
  cell: number | string;
}

const Cell: React.FC<CellProps> = (props) => {
  return <div className="Cell">B</div>;
};

export default Cell;

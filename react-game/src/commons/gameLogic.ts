export interface TileProps {
  open: boolean
  flag: boolean
  value: number | string
}

export const cellStr = (row: number, col: number) => {
  return `${row}x${col}`;
};

export const expandIfEmpty = (field: any, row: number, col: number) => {
  const bugMatrix = createBugNumMatrix(field.rows, field.columns, field.bugs);
  if (bugMatrix[row][col]) {
    return [];
  }

  const result: Set<String> = new Set();

  function expand(row: number, col: number): void {
    if (!bugMatrix[row] || typeof bugMatrix[row][col] != 'number') {
      return; // out of the field
    }

    if (result.has(cellStr(row, col))) {
      return;
    }

    result.add(cellStr(row, col));

    if (bugMatrix[row][col] !== 0) {
      return;
    }

    other8(row, col).forEach(([adjRow, adjCol]) => expand(adjRow, adjCol))
  }

  expand(row, col);
  return result;
}

export const createBugNumMatrix = (rows: number, columns: number, bugs: string[]) => {
  const result: number[][] = new Array(rows).fill(0).map(() => new Array(columns).fill(0));
  bugs.forEach(bug => {
    const [bugRow, bugCol] = bug.split('x');
    const nextToBug = adjacentCells(rows, columns, Number(bugRow), Number(bugCol));
    nextToBug.forEach(([row, col]) => {
      result[row][col]++
    })
  })
  return result;
}

function other8(rowNum: number, colNum: number) {
  return [
    [rowNum - 1, colNum - 1],
    [rowNum - 1, colNum    ],
    [rowNum - 1, colNum + 1],
    [rowNum,     colNum - 1],
    [rowNum,     colNum + 1],
    [rowNum + 1, colNum - 1],
    [rowNum + 1, colNum    ],
    [rowNum + 1, colNum + 1],
  ];
}

function adjacentCells(rows: number, columns: number, rowNum: number, colNum: number) {
  return other8(rowNum, colNum).filter(([row, col]) => row >= 0 && col >= 0 && row < rows && col < columns);
}
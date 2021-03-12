import {cellStr, createBugNumMatrix, expandIfEmpty} from './gameLogic'

describe('BugNumMatrix', () => {
  it('consists of 0s if there is no bugs', () => {
    const empty2x3 = createBugNumMatrix(2, 3, []);
    expect(empty2x3).toEqual([
      [0, 0, 0],
      [0, 0, 0],
    ])
  });

  it('surrounds a bug with mines', () => {
    const field = createBugNumMatrix(4, 4, ['2x2']);
    expect(field).toEqual([
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 1, 0, 1],
      [0, 1, 1, 1],
    ])
  });

  it('gives 8 for a cell surrounded by bugs', () => {
    const bugs = [
      '1x1', '1x2', '1x3',
      '2x1',        '2x3',
      '3x1', '3x2', '3x3',
    ];
    const field = createBugNumMatrix(5, 5, bugs);
    expect(field).toEqual([
      [1, 2, 3, 2, 1],
      [2, 2, 4, 2, 2],
      [3, 4, 8, 4, 3],
      [2, 2, 4, 2, 2],
      [1, 2, 3, 2, 1],
    ])
  })
});

describe('expandIfEmpty', () => {

  it('expands an empty field entirely', () => {
    expect(expandIfEmpty({rows: 2, columns: 3, bugs: []}, 0, 0)).toEqual(
      new Set([
        "0x0", "0x1", "0x2",
        "1x0", "1x1", "1x2",
      ])
    )
  })

  const fieldBugs = ["0x3", "1x2", "2x1", "3x0", "7x1"];
  const testField = {rows: 12, columns: 12, bugs: fieldBugs}

  it('visualize the test field', () => { // for convenient tests writing
    expect(fieldToStr(testField)).toEqual(`
        0  1  2  3  4  5  6  7  8  9  a  b
        ------------------------------------
        0, 1, 2, B, 1, 0, 0, 0, 0, 0, 0, 0 | 0
        1, 2, B, 2, 1, 0, 0, 0, 0, 0, 0, 0 | 1
        2, B, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0 | 2
        B, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 3
        1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 4
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 5
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 6
        1, B, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 7
        1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 8
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | 9
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | a
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 | b
    `.replace(/^\s+/mg, ""))
  });

  it('not expands if not empty', () => {
    expect(expandIfEmpty(testField, 1, 1)).toEqual(new Set());
  });

  it('not expands open a lone bug', () => {
    expect(expandIfEmpty(testField, 7, 1)).toEqual(new Set());
  });

  it('expands an empty corner', () => {
    expect(expandIfEmpty(testField, 0, 0)).toEqual(new Set(["0x0", "0x1", "1x1", "1x0"]))
  })
});

function fieldToStr({rows, columns, bugs}) {
  const base36 = (num) => (+num).toString(36);
  const matrix = createBugNumMatrix(rows, columns, bugs);

  let result = [...new Array(columns)].map((_, i) => base36(i)).join("  ") + "\n";
  result += "-".repeat(rows * 3) + "\n";
  matrix.forEach((row, rowNum) => {
    result += row.map((cell, colNum) => bugs.includes(cellStr(rowNum, colNum)) ? "B" : cell).join(", ");
    result += " | " + base36(rowNum) + "\n";
  })
  return result;
}
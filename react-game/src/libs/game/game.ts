import {createRandomListOfCoordinats} from "../random";
import {addProperties, createMatrix} from "../../utils";
import {FieldOfBugs, TileProps} from "./game.model";

const isTileExist = (x: number, y: number, field: FieldOfBugs) => {
  return x < field.length && x >= 0 && y < field[0].length && y >= 0;
};

const hasValueByCoords = (field: TileProps) => Boolean(field.value);

export const openEmptyTiles = (x: number, y: number, field: FieldOfBugs): FieldOfBugs | undefined => {
  if (hasValueByCoords(field[x][y])) {
    return;
  }
    openTile(x + 1, y, field);
    openTile(x + 1, y + 1, field);
    openTile(x + 1, y - 1, field);
    openTile(x - 1, y, field);
    openTile(x - 1, y - 1, field);
    openTile(x - 1, y + 1, field);
    openTile(x, y + 1, field);
    openTile(x, y - 1, field);
  
  return field;
};

const openTile = (x: number, y: number, field: FieldOfBugs) => {
  if (isTileExist(x, y, field) && isTileNotABug(x, y, field) && !field[x][y].open && !field[x][y].flag) {
    field[x][y].open = true;

    openEmptyTiles(x, y, field);
  }
  return field;
};

const isTileNotABug = (x: number, y: number, field: FieldOfBugs) => {
  return typeof field[x][y].value === "number";
};

const bugCounter = (x: number, y: number, arr: FieldOfBugs): void => {
  if (isTileExist(x, y, arr) && isTileNotABug(x, y, arr)) {
    arr[x][y].value = Number(arr[x][y].value) + 1;
  }
};

export const plantBugs = (
  rows: number,
  columns: number,
  bugs: number,
): {field: FieldOfBugs; listOfBugs: number[][]} => {
  const field: FieldOfBugs = addProperties(createMatrix(rows, columns, 0));
  const listOfBugs = createRandomListOfCoordinats(bugs, rows, columns);
  listOfBugs.forEach((c: number[]) => {
    const [x, y] = c;
    field[x][y].value = "B";
    bugCounter(x + 1, y, field);
    bugCounter(x + 1, y + 1, field);
    bugCounter(x + 1, y - 1, field);
    bugCounter(x - 1, y, field);
    bugCounter(x - 1, y - 1, field);
    bugCounter(x - 1, y + 1, field);
    bugCounter(x, y + 1, field);
    bugCounter(x, y - 1, field);
  });
  return {field, listOfBugs};
};

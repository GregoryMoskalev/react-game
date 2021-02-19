export interface Properties {
  value: number | string;
  open: boolean;
  flag: boolean;
}

type FieldOfBugs = Properties[][];

export const createMatrix = (x: number, y: number, fill: any) => {
  return new Array(x).fill(0).map(() => new Array(y).fill(fill));
};

export const addProperties = (
  matrix: number[][],
  propsObj = { value: 0, open: false, flag: false },
) => {
  return matrix.map((arr) => {
    return arr.map((e) => {
      return { ...propsObj };
    });
  });
};

const randomInteger = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const createRandomListOfCoordinats = (n: number, maxX: number, maxY: number): string[] => {
  const list = new Set();
  while (list.size < n) {
    list.add(`${randomInteger(maxX)}-${randomInteger(maxY)}`);
  }
  return Array.from(list) as string[]; // spreading cause a TS warning
};

const bugCounter = (x: number, y: number, arr: FieldOfBugs): void => {
  if (
    x < arr.length &&
    x >= 0 &&
    y < arr[0].length &&
    y >= 0 &&
    typeof arr[x][y].value === 'number'
  ) {
    arr[x][y].value = Number(arr[x][y].value) + 1;
  }
};

export const plantBugs = (field: FieldOfBugs, bugsCoords: string[]): FieldOfBugs => {
  const arr = [...field];
  bugsCoords.forEach((c: string) => {
    const [x, y] = c.split('-').map((e) => Number(e));
    arr[x][y].value = 'B';
    bugCounter(x + 1, y, arr);
    bugCounter(x + 1, y + 1, arr);
    bugCounter(x + 1, y - 1, arr);
    bugCounter(x - 1, y, arr);
    bugCounter(x - 1, y - 1, arr);
    bugCounter(x - 1, y + 1, arr);
    bugCounter(x, y + 1, arr);
    bugCounter(x, y - 1, arr);
  });
  return arr;
};

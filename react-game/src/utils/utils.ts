type FieldOfBugs = (number | string)[][];

export const createMatrix = (x: number, y: number) => {
  return new Array(x).fill(0).map(() => new Array(y).fill(0));
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

const bugCounter = (x: number, y: number, arr: (string | number)[][]): void => {
  if (x < arr.length && x >= 0 && y < arr[0].length && y >= 0 && typeof arr[x][y] === 'number') {
    arr[x][y] = Number(arr[x][y]) + 1;
  }
};

export const plantBugs = (field: (string | number)[][], bugsCoords: string[]): FieldOfBugs => {
  const arr = [...field];
  bugsCoords.forEach((c: string) => {
    const [x, y] = c.split('-').map((e) => Number(e));
    arr[x][y] = 'B';
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

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

export const plantBugs = (field: (string | number)[][], bugsCoords: string[]) => {
  const arr = [...field];
  bugsCoords.forEach((c: string) => {
    const [x, y] = c.split('-');
    arr[Number(x)][Number(y)] = 'B';
  });
  return arr;
};

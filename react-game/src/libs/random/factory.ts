export const randomInteger = (max: number): number => {
  return Math.floor(Math.random() * Math.floor(max));
};

export const createRandomListOfCoordinats = (n: number, maxX: number, maxY: number): number[][] => {
  const list = new Set();
  while (list.size < n) {
    list.add(`${randomInteger(maxX)}-${randomInteger(maxY)}`);
  }
  const arr = Array.from(list) as string[];

  return arr.map((s) => s.split('-').map((e) => Number(e))); // spreading cause a TS warning
};
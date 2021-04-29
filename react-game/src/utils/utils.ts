export const createMatrix = (x: number, y: number, fill: any) => {
  return new Array(x).fill(0).map(() => new Array(y).fill(fill));
};


export const addProperties = (matrix: number[][], propsObj = { value: 0, open: false, flag: false }) => {
  return matrix.map((arr) => {
    return arr.map((e) => {
      return { ...propsObj };
    });
  });
};



const createMatrix = (x:number, y:number) => {
  return new Array(x).fill(0).map(() => new Array(y).fill(0));
}

export default createMatrix;
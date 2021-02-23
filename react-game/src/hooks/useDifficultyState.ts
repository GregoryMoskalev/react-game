import { useState } from 'react';

const changeDifficulty = (difficulty: number) => {
  const value = {
    rows: 0,
    columns: 0,
    bugs: 0,
  };

  switch (difficulty) {
    case 2:
      value.rows = 16;
      value.columns = 30;
      value.bugs = 99;
      break;
    case 1:
      value.rows = 16;
      value.columns = 16;
      value.bugs = 40;
      break;
    case 0:
      value.rows = 9;
      value.columns = 9;
      value.bugs = 10;
      break;
  }
  return value;
};

export default (
  initialValue: number,
): [{ columns: number; rows: number; bugs: number }, (arg0: any) => void] => {
  const [value, setValue] = useState(changeDifficulty(initialValue));
  const handleChange = (newState: any) => {
    setValue(changeDifficulty(newState));
  };

  return [value, handleChange];
};

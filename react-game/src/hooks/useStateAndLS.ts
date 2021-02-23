import { useState } from 'react';

export default (initialState: any, localStorageKey: string): [number, (arg0: any) => void] => {
  const [value, setValue] = useState(localStorage.getItem(localStorageKey) || initialState);

  const handleChange = (newState: any) => {
    setValue(newState);
    localStorage.setItem(localStorageKey, newState);
  };

  return [value, handleChange];
};

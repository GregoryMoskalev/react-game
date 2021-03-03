import { useState } from 'react';

export default (initialState: any, localStorageKey: string): [any, (arg0: any) => void] => {
  const stateFromLS =
    typeof initialState === 'object'
      ? JSON.parse(localStorage.getItem(localStorageKey)!)
      : localStorage.getItem(localStorageKey);
  const [value, setValue] = useState(stateFromLS || initialState);

  const handleChange = (newState: any) => {
    setValue(newState);
    if (typeof newState === 'object') {
      localStorage.setItem(localStorageKey, JSON.stringify(newState));
    } else {
      localStorage.setItem(localStorageKey, newState);
    }
  };

  return [value, handleChange];
};

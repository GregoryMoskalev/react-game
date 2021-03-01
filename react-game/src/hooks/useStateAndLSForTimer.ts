import { useState } from 'react';

export default (): [number, (arg0: boolean) => void, () => void] => {
  const timerStart = localStorage.getItem('bugsweeper-timerStart');
  const timer = localStorage.getItem('bugsweeper-timer');
  const [start, setStart] = useState(Number(timerStart) || 0);
  const [id, setId]: any[] = useState(0);
  const [value, setValue] = useState(Number(timer) || 0);

  const startTimer = (reset: boolean) => {
    let s: number;
    if (reset) {
      clearInterval(id);
      setValue(0);
      s = Date.now();
      setStart(s);
    } else {
      s = start;
    }

    localStorage.setItem('bugsweeper-timerStart', String(s));

    const intervalID = setInterval(() => {
      const time = Date.now() - s;
      setValue(Date.now() - s);
      localStorage.setItem('bugsweeper-timer', String(time));
    }, 1000);
    setId(intervalID);
  };

  const resetTimer = () => {
    clearInterval(id);
  };

  return [value, startTimer, resetTimer];
};

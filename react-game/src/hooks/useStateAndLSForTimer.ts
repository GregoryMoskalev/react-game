import { useState } from 'react';

export default (): [number, (arg0: boolean) => void, () => void] => {
  const timer = localStorage.getItem('bugsweeper-timer');
  const [ids, setId]: any[] = useState([]);
  const [value, setValue] = useState(Number(timer) || 0);

  const startTimer = (reset: boolean) => {
    let counter = value;
    if (reset) {
      resetTimer();
      counter = 0;
      setValue(0);
    }

    const intervalID = setInterval(() => {
      const timer = (counter += 1);
      setValue(timer);
      localStorage.setItem('bugsweeper-timer', String(timer));
    }, 1000);
    setId((ids: NodeJS.Timer[]) => {
      ids.push(intervalID);
      return ids;
    });
  };

  const resetTimer = () => {
    ids.forEach((id: NodeJS.Timer) => {
      return clearInterval(id);
    });
  };

  return [value, startTimer, resetTimer];
};

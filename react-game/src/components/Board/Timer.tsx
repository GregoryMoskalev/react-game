import React, { useEffect, useState } from "react";

interface TimerProps {
  start: number,
  tick: boolean,
}

const padTimer = (num: number) => num > 9 ? (num + '') : ('0' + num);

const formatTimer = (seconds: number) => {
  const ss = padTimer(seconds % 60);
  const mm = padTimer(Math.round(seconds / 60))
  return mm + ':' + ss;
}

const Timer: React.FC<TimerProps> = ({start, tick}) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  useEffect(() => setSecondsElapsed(0), [start])
  useEffect(() => {
    if (!tick) {
      return
    }
    const timerId = setInterval(() => {
      setSecondsElapsed(Math.round((Date.now() - start) / 1000));
    }, 1000);
    return () => clearInterval(timerId);
  }, [tick]);

  return <div className="Board-timer">{formatTimer(secondsElapsed)}</div>;
}

export default Timer;
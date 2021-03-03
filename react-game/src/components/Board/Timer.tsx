import React, { useEffect, useState } from "react";
import { formatTimer } from "../../utils/utils";

interface TimerProps {
  start: number,
  tick: boolean,
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
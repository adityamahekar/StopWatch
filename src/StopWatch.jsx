import React, { useState, useEffect, useRef } from "react";

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now(0) - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formatTime() {
    let hr = Math.floor(elapsedTime / (1000 * 60 * 60));
    let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let sec = Math.floor((elapsedTime / 1000) % 60);
    let millsec = Math.floor((elapsedTime % 1000) / 10);

    hr = String(hr).padStart(2, "0");
    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    millsec = String(millsec).padStart(2, "0");

    return `${hr}:${min}:${sec}:${millsec}`;
  }

  return (
    <div className="stopWatch">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <button onClick={start} className="start-button">
          Start
        </button>

        <button onClick={stop} className="stop-button">
          Stop
        </button>
        <button onClick={reset} className="reset-button">
          Reset
        </button>
      </div>
    </div>
  );
}

export default StopWatch;

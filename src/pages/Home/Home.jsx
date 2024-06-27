import React, { useEffect, useRef, useState } from "react";
import "./Home.css";

const Home = () => {
  const [isRuning, setIsRuning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
//   naga useRef
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);
  useEffect(() => {
    if (isRuning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    //   console.log(intervalIdRef.current);
    }
    //bu nega kere
    return () => {
        // naga?
      clearInterval(intervalIdRef.current);
      console.log(intervalIdRef.current);
    };
  }, [isRuning]);

  function start() {
    setIsRuning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }
  function stop() {
    setIsRuning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRuning(false);
  }

  function FormatTime() {
    // math floor, ceil,   korib ciqiw
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    // %?
    let minuts = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    minuts = String(minuts).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    return `${hours}:${minuts}:${seconds}:${milliseconds}`;
  }
  return (
    <div>
      <div className="timer">
        <div className="box">
          <div className="time">{FormatTime()}</div>
          <div className="time-controller">
            <button className="start-btn" onClick={start}>start</button>
            <button className="stop-btn" onClick={stop}>stop</button>
            <button className="reset-btn" onClick={reset}>reset</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

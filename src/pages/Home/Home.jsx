import React, { useEffect, useRef, useState } from "react";
import sound from "../../audio/alarm.mp3";
import { HiOutlineTrash } from "react-icons/hi";
import { useToggle } from '@mantine/hooks';
import "./Home.css";

const Home = () => {
  const [isRuning, setIsRuning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRuning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
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
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minuts = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    minuts = String(minuts).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");
    return `${hours}:${minuts}:${seconds}:${milliseconds}`;
  }

  const [isHour, setIsHour] = useState(0);
  const [isMinutes, setIsMinutes] = useState(0);
  const [isInfoTime, setIsInfoTime] = useState("");
  const [alarmArr, setAlarmArr] = useState([]);
  useEffect(() => {
    const updateTime = () => {
      let now = new Date();
      let hour = now.getHours();
      let minutes = now.getMinutes();
      hour = String(hour).padStart(2, "0");
      minutes = String(minutes).padStart(2, "0");
      setIsInfoTime(`${hour}:${minutes}`);
    };

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId); 
  }, []);

  const audio = new Audio(sound);

  useEffect(() => {
    const alarmIntervalId = setInterval(() => {
      if (alarmArr.includes(isInfoTime )) {
        audio.play();
      }
    }, 1000);

    return () => clearInterval(alarmIntervalId);
  }, [alarmArr, isInfoTime]);

  const setAlarm = () => {
    let hour = String(isHour).padStart(2, "0");
    let minutes = String(isMinutes).padStart(2, "0");
    setAlarmArr((prevSetAlarm) => [...prevSetAlarm, `${hour}:${minutes}`]);
   
  };

  const closeAlarm = (index) => {
    setAlarmArr((prevSetAlarm) => prevSetAlarm.filter((_, i) => i !== index));
  };


  return (
    <div className="wrapper">
      <div className="timer">
        <div className="box">
          <div className="time">{FormatTime()}</div>
          <div className="time-controller">
            <button className="start-btn" onClick={start}>
              start
            </button>
            <button className="stop-btn" onClick={stop}>
              stop
            </button>
            <button className="reset-btn" onClick={reset}>
              reset
            </button>
          </div>
        </div>
      </div>
      <div>
      <div className="alarm-wrapper">
      <div className="alarm">
        <h1>Time: {isInfoTime}</h1>
        <div className="alarm-control">
        <input 
          type="number" 
          value={isHour} 
          onChange={(e) => setIsHour(e.target.value)} 
          placeholder="Hour" 
        />
        <input 
          type="number" 
          value={isMinutes} 
          onChange={(e) => setIsMinutes(e.target.value)} 
          placeholder="Minutes" 
        />
        </div>
        <button onClick={setAlarm} className="set-alarm">Set Alarm</button>
      </div>
      <div className="cards">
        {alarmArr.map((alarm, index) => (
          <div key={index} className="card">
            <span>{alarm}</span>

            <div className="btns">
            <button onClick={() => closeAlarm(index)}>
              <HiOutlineTrash/>
            </button>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
    </div>
  );


};



  

export default Home;

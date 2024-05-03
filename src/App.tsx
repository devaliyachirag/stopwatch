import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
function App() {
  const [time, setTime] = useState<number>(0);
  const [start, setStart] = useState<boolean>(false);
  const [initialTime, setInitialTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let timer: any;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsRunning(false);
            return 0;
          }
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setStart(false);
    setTime(0);
    setInitialTime(0)
  };

  const handleInputChange = (event: any) => {
    const minutes = parseInt(event.target.value);
    setInitialTime(minutes * 60);
    console.log(minutes);
    setTime(minutes * 60);
  };
  return (
    <div>
      <h1 className="text-center my-5">Countdown Timer</h1>
      <div className="d-flex flex-column align-items-center">
        <input
          className="form-control w-25"
          type="number"
          value={initialTime / 60}
          onChange={handleInputChange}
          placeholder="Enter time in minutes"
        />
        {start ? (
          <div className="mt-5 d-flex justify-content-between w-25">
            <button className="btn btn-success" onClick={handleReset}>
              Reset
            </button>
            <button className="btn btn-primary" onClick={handleStart}>
              Start
            </button>
            <button className="btn btn-danger text-light" onClick={handlePause}>
              Pause
            </button>
          </div>
        ) : (
          <div className="mt-5 d-flex justify-content-center w-25">
            <button className="btn btn-primary" onClick={()=>setStart(true)}>GO !!</button>
          </div>
        )}
      </div>
      <div>
        <div className="container d-flex justify-content-evenly mt-5">
          <div className="h1 box">
            {isNaN(time) ? 0 : Math.floor(time / 3600)}
          </div>
          <div className="h1 box">
            {isNaN(time) ? 0 : Math.floor(time / 60) % 60}
          </div>
          <div className="h1 box">{isNaN(time) ? 0 : time % 60}</div>
        </div>
      </div>
    </div>
  );
}

export default App;

import { useState, useEffect, useRef } from "react";
import "./index.css";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const handleStartPause = () => setIsRunning((prev) => !prev);

  const handleLap = () => {
    if (isRunning) setLaps((prev) => [...prev, formatTime(time)]);
  };

  const handleReset = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
    setLaps([]);
  };

  return (
    <>
      <div class="bg-container">
        <div className="stopwatch-container">
          <h1>Stopwatch</h1>
          <div className="stopwatch-time">{formatTime(time)}</div>
          <div className="stopwatch-buttons">
            <button onClick={handleStartPause}>
              {isRunning ? "Pause" : time === 0 ? "Start" : "Resume"}
            </button>

            {/* Lap button when stopwatch is running or paused after start */}
            {isRunning || time > 0 ? (
              <button onClick={handleLap} disabled={!isRunning}>
                Lap
              </button>
            ) : null}

            <button onClick={handleReset}>Reset</button>
          </div>

          {laps.length > 0 && (
            <div className="laps">
              <h2>Laps</h2>
              <ul>
                {laps.map((lap, index) => (
                  <li key={index}>
                    Lap {index + 1}: {lap}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Stopwatch;

//without laps

// import { useState, useEffect, useRef } from "react";
// import "./index.css";

// const Stopwatch = () => {
//   const [time, setTime] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);
//   const intervalRef = useRef(null);

//   useEffect(() => {
//     if (isRunning) {
//       intervalRef.current = setInterval(() => {
//         setTime((prev) => prev + 1);
//       }, 1000);
//     } else {
//       clearInterval(intervalRef.current);
//     }

//     return () => clearInterval(intervalRef.current);
//   }, [isRunning]);

//   const formatTime = (totalSeconds) => {
//     // Calculate hours
//     let hours = Math.floor(totalSeconds / 3600);

//     // Calculate remaining minutes
//     let minutes = Math.floor((totalSeconds % 3600) / 60);

//     // Calculate remaining seconds
//     let seconds = totalSeconds % 60;

//     // Convert to string and add 0 in front if less than 10
//     let hrsStr = hours < 10 ? "0" + hours : "" + hours;
//     let minsStr = minutes < 10 ? "0" + minutes : "" + minutes;
//     let secsStr = seconds < 10 ? "0" + seconds : "" + seconds;

//     // Combine and return in HH:MM:SS format
//     return hrsStr + ":" + minsStr + ":" + secsStr;
//   };

//   const handleStartPause = () => {
//     setIsRunning((prev) => !prev);
//   };

//   const handleReset = () => {
//     setIsRunning(false);
//     clearInterval(intervalRef.current);
//     setTime(0);
//   };

//   return (
//     <div className="bg-container">
//       <div className="stopwatch-container">
//         <h1>Stopwatch</h1>
//         <div className="stopwatch-time">{formatTime(time)}</div>
//         <div className="stopwatch-buttons">
//           <button onClick={handleStartPause}>
//             {isRunning ? "Pause" : time === 0 ? "Start" : "Resume"}
//           </button>
//           <button onClick={handleReset}>Reset</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stopwatch;

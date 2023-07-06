import React, { useEffect, useState } from "react";
import { toMMSS } from "../gameFunctions";
import styles from "../../pageStyles/GameTimer.module.css";
const GameTimer = () => {

  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval = setInterval(startTimer, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const startTimer = () => {
    setTimer((prev) => prev + 1);
  };
  return (
    <div
      timer={toMMSS(timer)}
      style={{
        "--timer-color": getColor(timer),
      }}
      className={styles.timer}
    />
  );
};

export default GameTimer;

const getColor = (timer) => {
  if (timer > 10) return "#9dd241";
  if (timer % 2 === 0) return "red";
  return "#9dd241";
};

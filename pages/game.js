import D2Canvas from "../Components/D2Canvas";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import socket from "../common/socket";
import styles from "../pageStyles/Game.module.css";
import ChatBox from "../Components/ChatBox";
import { ROUND_TIME } from "../Components/Constants";
import useWindowDimensions from "../Components/CustomHooks/useWindowDimensions";

const game = () => {
  const router = useRouter();
  const roomId = router.query.room;
  const { height, width } = useWindowDimensions();
  const [userName, setUserName] = useState("");
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    socket.on("roomUsers", getRoomInfo);
    return () => {
      socket.off("roomUsers", getRoomInfo);
    };
  }, []);

  useEffect(() => {
    if (!roomId) return;
    let name = localStorage.getItem("username");

    if (name) {
      setUserName(name);
    } else {
      router.push(`/?redirect=${roomId}`);
    }

    if (name && roomId) {
      let room = {
        id: roomId,
        roundTimer: ROUND_TIME
      };
      socket.emit("joinRoom", { username: name, room });
    }
  }, [roomId]);

  const getRoomInfo = (room) => {
    console.log(room);
  };

  useEffect(() => {
    setTimeout(() => { }, 1000 * ROUND_TIME * 60);
  }, []);

  useEffect(() => {
    let interval = setInterval(startTimer, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const startTimer = () => {
    console.log("sds");
    setTimer((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.main}>
        {roomId ? (
          <div
            className={styles.gameContainer}
          >
            <D2Canvas roomId={roomId} height={height} width={width} />
            <ChatBox countdownTimer={timer} height={height} width={width} />
          </div>
        ) : (
          <h1 className="error">This Room Doesn't exist!</h1>
        )}
      </div>
    </>
  );
};

export default game;

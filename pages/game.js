import D2Canvas from "../Components/D2Canvas";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import socket from "../common/socket";
import styles from "../styles/Canvas.module.css";
import ChatBox from "../Components/ChatBox";

const game = () => {
  const router = useRouter();
  const roomId = router.query.room;

  const [userName, setUserName] = useState("");

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
      };
      socket.emit("joinRoom", { username: name, room });
    }
  }, [roomId]);
  
  const getRoomInfo = (room) => {
    console.log(room);
  };

  return (
    <>
      <div className={styles.main}>
        {userName && roomId ? (
          <div
            className="flex-row"
            style={{ justifyContent: "space-between", width: "60vw" }}
          >
            <D2Canvas styles={styles} roomId={roomId} />
            <ChatBox />
          </div>
        ) : (
          <h1 className="error">This Room Doesn't exist!</h1>
        )}
      </div>
    </>
  );
};

export default game;

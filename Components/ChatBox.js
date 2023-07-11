import { useEffect, useState } from "react";
import socket from "../common/socket";
import styles from "../pageStyles/Chatbox.module.css";
import SkrawlInput from "./CustomComponents/SkrawlElements/SkrawlInput";
import GameTimer from "./CustomComponents/GameTimer";
import SkrawlArrowBtn from "./CustomComponents/SkrawlElements/SkrawlArrowBtn";
const ChatBox = ({ height = 0, width = 0 }) => {
  const [messages, setMessages] = useState([]);

  const updateMessages = (msg) => {
    setMessages((prevMsgs) => [...prevMsgs, msg]);
  };

  useEffect(() => {
    socket.on("message", updateMessages);
    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    let msg = e.target.msg.value;
    if (!msg) return;
    socket.emit("chatMessage", msg);
    e.target.msg.value = "";
  };

  return (
    <div
      style={{ height: width > 720 ? height / 1.47 : 'unset' }}
      className={styles.chatBox}
    >
      <div>
        <GameTimer />
        <div className={styles.chats}>
          {messages.map((msg, idx) => (
            <div
              key={msg.username + msg.text + idx}
              className={styles.msg}
              style={{
                justifyContent: msg.username === "broadcast" && "center",
              }}
            >
              {msg.username !== "broadcast" && (
                <div className={styles.avatar}></div>
              )}

              {msg.username !== "broadcast" ? (
                <h4>{`${msg.username}:`}</h4>
              ) : (
                <></>
              )}
              <span style={{ marginLeft: ".5rem" }}>{msg.text}</span>
            </div>
          ))}
        </div>
      </div>
      <form className={styles.form} onSubmit={sendMessage}>
        <SkrawlInput autoComplete="off"
          name="msg"
          placeholder="Type your guess here..." />
        <SkrawlArrowBtn type="submit" />
      </form>
    </div>
  );
};

export default ChatBox;
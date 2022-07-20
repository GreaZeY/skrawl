import { useEffect, useState } from "react";
import socket from "../common/socket";
import styles from "../styles/Chatbox.module.css";
import { toMMSS } from "./gameFunctions";
const ChatBox = ({ countdownTimer }) => {
  const [messages, setMessages] = useState([]);

  const updateMessages = (msg) => {
    setMessages((prevMsgs) => [...prevMsgs, msg]);
  };
  useEffect(() => {
    socket.on("message", updateMessages);
    return () => {
      socket.off("message", updateMessages);
    };
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    let msg = e.target.msg.value;
    if (!msg) return;
    socket.emit("chatMessage", msg);
    e.target.msg.value = "";
  };
console.log(messages)
  return (
    <div timer={toMMSS(countdownTimer)} className={styles.chatBox}>
      {/* <div className={styles.msg} style={{ justifyContent: "center" }}>
        {toMMSS(countdownTimer)}
      </div> */}
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
        <form className={styles.form} onSubmit={sendMessage}>
          <input
            autoComplete="off"
            tabIndex="-1"
            name="msg"
            placeholder="Type your guess here..."
          />
          <button type="submit" tabIndex="-1"></button>
        </form>
    </div>
  );
};

export default ChatBox;

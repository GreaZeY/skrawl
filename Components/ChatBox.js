import { useEffect, useState } from "react";
import socket from "../common/socket";
import styles from "../styles/Chatbox.module.css";
const ChatBox = () => {
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
    if(!msg) return
    socket.emit("chatMessage", msg);
    e.target.msg.value = "";
  };

  return (
    <div className={styles.chatBox}>
      <div style={{ overflow: "scroll" }}>
        {messages.map((msg) => (
          <div
            className={styles.msg}
            style={{ justifyContent: msg.username === "broadcast" && "center" }}
          >
            {msg.username !== "broadcast" && (
              <div className={styles.avatar}></div>
            )}

            {(msg.username !== "broadcast" ? `${msg.username}: ` : "") +
              msg.text}
          </div>
        ))}
      </div>
      <form className={styles.form} onSubmit={sendMessage}>
        <input name="msg" placeholder="Type your guess here..." />
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default ChatBox;

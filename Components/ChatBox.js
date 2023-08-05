import { useState } from "react";
import styles from "../pageStyles/Chatbox.module.css";
import SkrawlInput from "./CustomComponents/SkrawlElements/SkrawlInput";
import GameTimer from "./CustomComponents/GameTimer";
import SkrawlArrowBtn from "./CustomComponents/SkrawlElements/SkrawlArrowBtn";
import { useRouter } from "next/router";
import { sendRequestToPusher } from "../lib/pusherUtils";
import usePusherEvent from "../Hooks/usePusherEvent";
import { CHAT } from "../common/Constants";

const ChatBox = ({ height = 0, width = 0 }) => {
  const [messages, setMessages] = useState([]);
  const router = useRouter();
  const roomId = router.query.room;

  const updateMessages = (msg) => {
    setMessages((prevMsgs) => [...prevMsgs, msg]);
  };
  usePusherEvent(roomId, CHAT, updateMessages);

  const sendMessage = (e) => {
    e.preventDefault();
    let msg = e.target.msg.value;
    if (!msg) return;
    let username = localStorage.getItem("username");
    sendRequestToPusher(`chat/${roomId}`, { username, text: msg });
    e.target.msg.value = "";
  };

  return (
    <div
      style={{ height: width > 720 ? height / 1.47 : "unset" }}
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
        <SkrawlInput
          autoComplete="off"
          name="msg"
          placeholder="Type your guess here..."
        />
        <SkrawlArrowBtn type="submit" />
      </form>
    </div>
  );
};

export default ChatBox;

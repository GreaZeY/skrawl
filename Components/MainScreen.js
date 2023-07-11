import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import styles from "../pageStyles/MainScreen.module.css";
import socket from "../common/socket";
import SkrawlInput from "./CustomComponents/SkrawlElements/SkrawlInput";
import SkrawlActionBtn from "./CustomComponents/SkrawlElements/SkrawlActionBtn";
import AvatarPicker from "./AvatarPicker/AvatarPicker";

const MainScreen = () => {
  const router = useRouter();

  const joinGame = (e) => {
    e.preventDefault();
    let username = e.target.name.value;
    let room = {
      id: router.query.redirect || uuidv4(),
      createdBy: username,
    };
    localStorage.setItem("username", username);
    socket.emit("joinRoom", { username, room });
    router.push(`/game?room=${room.id}`);
  };

  const onAavatarChange = (avatar) => {
    console.log(avatar)
  };

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>SKRAWL</h1>
      <AvatarPicker onChange={onAavatarChange} />
      <form className={styles.form} onSubmit={joinGame}>
        <div className="flex-row">
          <SkrawlInput
            style={{ width: "30vmax" }}
            name="name"
            minLength={3}
            maxLength={12}
            required
            autoComplete="off"
            placeholder="Enter Your Name"
          />
          <SkrawlActionBtn title="Play" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default MainScreen;

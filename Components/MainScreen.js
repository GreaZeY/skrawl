import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../pageStyles/MainScreen.module.css";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import socket from "../common/socket";
import { skrawlAvatars } from "./Constants";
import SkrawlInput from "./CustomComponents/SkrawlInput/SkrawlInput";

const MainScreen = () => {
  const router = useRouter();
  const [currentImg, setCurrentImg] = useState(0);

  const setImgIndex = (opt) => {
    let lastIndex = skrawlAvatars.length - 1;
    if (opt === "ADD") {
      if (lastIndex === currentImg) return setCurrentImg(0);
      setCurrentImg(currentImg + 1);
    } else {
      if (0 === currentImg) return setCurrentImg(lastIndex);
      setCurrentImg(currentImg - 1);
    }
  };

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

  return (
    <div className={styles.main}>
      <h1 className={styles.title}>SKRAWL</h1>
      <div className="flex-row">
        <div className={styles.navigateButton}>
          <NavigateBeforeIcon
            style={{ color: "black", fontSize: "5rem" }}
            onClick={() => setImgIndex()}
          />
        </div>
        <div
          className={styles.avatar}
          style={{ background: `url('${skrawlAvatars[currentImg].src}')` }}
        ></div>
        <div className={styles.navigateButton}>
          <NavigateNextIcon
            style={{ color: "black", fontSize: "5rem" }}
            onClick={() => setImgIndex("ADD")}
          />
        </div>
      </div>
      <form className={styles.form} onSubmit={joinGame}>
        <div className="flex-row">
          <SkrawlInput
            style={{width:'30vmax'}}
            name="name"
            minLength={3}
            maxLength={12}
            required
            autoComplete="off"
            placeholder="Enter Your Name" />
          <button type="submit" >Play!</button>
        </div>
      </form>
    </div>
  );
};

export default MainScreen;

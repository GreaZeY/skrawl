import { useState } from "react";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { getSkrawlAvatars } from "../Constants";
import styles from "./styles.module.css";

const skrawlAvatars = getSkrawlAvatars();

const AvatarPicker = ({ onChange }) => {
  const [currentImg, setCurrentImg] = useState(0);

  const setImgIndex = (opt) => {
    const lastIndex = skrawlAvatars.length - 1;
    let idx = currentImg;
    if (opt === "ADD") {
      ++idx;
      if (lastIndex === currentImg) idx = 0;
    } else {
      if (0 === currentImg) idx = lastIndex;
      --idx;
    }
    setCurrentImg(idx);
    onChange(skrawlAvatars[idx]);
  };

  return (
    <div className="flex-row">
      <div className={styles.navigateButton}>
        <MdNavigateBefore
          style={{ color: "black", fontSize: "5rem" }}
          onClick={() => setImgIndex()}
        />
      </div>
      <div
        className={styles.avatar}
        style={{ background: `url('${skrawlAvatars[currentImg].src}')` }}
      ></div>
      <div className={styles.navigateButton}>
        <MdNavigateNext
          style={{ color: "black", fontSize: "5rem" }}
          onClick={() => setImgIndex("ADD")}
        />
      </div>
    </div>
  );
};

export default AvatarPicker;

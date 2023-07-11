import styles from "./styles.module.css";

const SkrawlActionBtn = ({ title, ...props }) => {
  return (
    <button className={styles.skrawlBtn} {...props}>
      {title}
    </button>
  );
};

export default SkrawlActionBtn;

import styles from "./styles.module.css";

const SkrawlArrowBtn = ({ title, ...props }) => {
  return (
    <button className={styles.skrawlArrowBtn} {...props}>
      {title}
    </button>
  );
};

export default SkrawlArrowBtn;

import styles from './styles.module.css'
const SkrawlInput = ({ ...props }) => {
    return (
        <input className={styles.skrawlInput} {...props} />
    )
}

export default SkrawlInput
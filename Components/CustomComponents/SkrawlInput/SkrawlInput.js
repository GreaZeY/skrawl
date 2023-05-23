import styles from './styles.module.css'
const SkrawlInput = ({ ...props }) => {
    return (
        <input className={styles.input} {...props} />
    )
}

export default SkrawlInput
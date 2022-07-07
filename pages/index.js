import Head from 'next/head'
import styles from '../styles/Home.module.css'
import MainScreen from '../Components/MainScreen';


const title = 'Skrawl'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title} is a free multiplayer drawing and guessing game. Draw and guess words with your friends and people all around the world! Score the most points and be the winner!`} />
        <link rel="icon" href="/skrawl.png" />
      </Head>
      <main className={styles.main}>
        <MainScreen />
      </main>
      <footer className={styles.footer}>
        Created by - kaka ke papa
      </footer>
    </div>
  )
}

import Head from 'next/head'
import styles from '../styles/Home.module.css'
import CreateSquares from '../Components/CreateSquares';
import Canvas from '../Components/D2Canvas';
import ChatBox from '../Components/ChatBox';

// import Image from 'next/image'
// import CanvasDraw from "react-canvas-draw";

const title = 'Skrawl'

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>{title}</title>
        <meta name="description" content={`${title} is a free multiplayer drawing and guessing game. Draw and guess words with your friends and people all around the world! Score the most points and be the winner!`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <CreateSquares/>
        <Canvas />
      </main>
      {/* <ChatBox/> */}
      <footer className={styles.footer}>
        Created by - kaka ke papa
      </footer>
    </div>
  )
}


// const canvasProps = {
//   onChange: null,
//   loadTimeOffset: 5,
//   lazyRadius: 0,
//   brushRadius: .5,
//   brushColor: "#444",
//   catenaryColor: "#0a0302",
//   gridColor: "rgba(150,150,150,0.17)",
//   hideGrid: false,
//   disabled: false,
//   imgSrc: "",
//   saveData: null,
//   immediateLoading: false,
//   hideInterface: false,
//   gridSizeX: 25,
//   gridSizeY: 25,
//   gridLineWidth: 0.5,
//   hideGridX: false,
//   hideGridY: false,
//   enablePanAndZoom: true,
//   mouseZoomFactor: 0.01,
//   zoomExtents: { min: 0.33, max: 3 },
// };


/* <CanvasDraw
          {...canvasProps}
          // canvasWidth={window.innerWidth / 1.5}
          // canvasHeight={window.innerWidth / 1.5}
          style={{
            cursor:'none',
            boxShadow:
              "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
          }}
        /> */
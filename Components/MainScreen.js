import { v4 as uuidv4 } from 'uuid';
// console.log(uuidv4())
import { useState } from 'react';
import {useRouter} from 'next/router';
import styles from '../styles/MainScreen.module.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { importAll } from '../lib/utils'

let avatars = importAll(require.context('../public/avatars', false, /\.(png|jpe?g|svg)$/))

const MainScreen = () => {
  const router = useRouter()
  const [currentImg, setCurrentImg] = useState(0);


  const setImgIndex = (opt) => {
    let lastIndex = avatars.length - 1
    if (opt === 'ADD') {
      if (lastIndex === currentImg) return setCurrentImg(0)
      setCurrentImg(currentImg + 1)
    } else {
      if (0 === currentImg) return setCurrentImg(lastIndex)
      setCurrentImg(currentImg - 1)
    }
  }
 
  const joinGame=(e)=>{
    e.preventDefault()
    router.push('/game')
  }

  return (
    <div className={styles.main} >
      <h1 className={styles.title} >SKRAWL</h1>
      <div className='flex-row' >
        <div className={styles.navigateButton} >
          <NavigateBeforeIcon style={{ color: 'black', fontSize: '5rem' }} onClick={() => setImgIndex()} />
        </div>
        <div className={styles.avatar} style={{ background: `url('${avatars[currentImg].src}')` }}  ></div>
        <div className={styles.navigateButton} >
          <NavigateNextIcon style={{ color: 'black', fontSize: '5rem' }} onClick={() => setImgIndex('ADD')} />
        </div>
      </div>
      <form className={styles.form} onSubmit={joinGame} >
        <div className='flex-row' >
          <input type='name' required placeholder='Enter Your Name'  />
          <button>Play!</button>
        </div>

      </form>
    </div>
  )
}

export default MainScreen
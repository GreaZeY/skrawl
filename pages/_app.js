import { useEffect } from 'react'
import '../pageStyles/globals.css'

function MyApp({ Component, pageProps }) {
  useEffect(()=>{fetch('/api/socket')},[])
  return <Component {...pageProps} />
}

export default MyApp

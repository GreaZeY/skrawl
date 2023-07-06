import io from 'socket.io-client'

const localURL = typeof window === "undefined" ? 'http://localhost:3000': window.location.origin
const url = process.env.NEXT_APP_BASE_URL || localURL

let socket = io(url);

export default socket




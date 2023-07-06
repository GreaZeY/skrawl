import io from 'socket.io-client'
if (typeof window !== "undefined") {
    // Client-side-only code
}
const localURL = typeof window === "undefined" ? 'http://localhost:3000': window.location.origin
console.log(localURL)
const url = process.env.NEXT_APP_BASE_URL || localURL

fetch(`${url}/api/socket`)
let socket = io();


export default socket
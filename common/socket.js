import io from 'socket.io-client'

const url = process.env.NEXT_APP_BASE_URL || window.location.origin

fetch(`${url}/api/socket`)
let socket = io();


export default socket
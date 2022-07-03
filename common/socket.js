import io from 'socket.io-client'
let socket;

let port = process.env.PORT || 3000

socket = io(`http://localhost:${port}`, { path: "/socket.io" });


export default socket
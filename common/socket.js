import io from 'socket.io-client'
let socket;

let port = process.env.port || 3000

socket = io(`http://localhost:${port}`, { path: "/socket.io" });


export default socket
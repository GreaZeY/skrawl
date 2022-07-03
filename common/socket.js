import io from 'socket.io-client'
let socket;

const production = 'https://skrawl-grzy.herokuapp.com';
const development = 'http://localhost:3000';
const url = (process.env.NODE_ENV ? production : development);

socket = io(url, { path: "/socket.io" });


export default socket
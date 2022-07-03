import io from 'socket.io-client'
let socket;
console.log(process.env.NODE_ENV)
const production = 'https://skrawl-grzy.herokuapp.com';
const development = 'http://localhost:3000';
const url = (process.env.NODE_ENV==='production' ? production : development);

fetch(`${url}/api/socket`)
socket = io();


export default socket
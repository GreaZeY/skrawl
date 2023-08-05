import { Server } from "socket.io";
import { events } from "../../common/socketEvents";
const SocketHandler = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      // this function will call all socket events
      events(socket, io);
    });
  }
  res.end();
};

export default SocketHandler;

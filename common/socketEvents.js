const users = [];

//Join user to chat
function userJoin(id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
}

//Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}
//User leaves chat
function userLeave(id) {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

//Get room users
function getRoomUsers(roomId) {
  return users.filter((user) => user.room.id === roomId);
}

function formatMessage(username, text) {
  return {
    username,
    text,
  };
}

const appName = "broadcast";

// all socket events

export const events = (socket, io) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    socket.join(user.room.id);

    //Brodcast when user connects
    socket.broadcast
      .to(user.room.id)
      .emit(
        "message",
        formatMessage(appName, `${user.username} has joined the game!`)
      );

    //Send User and room Info
    io.to(user.room.id).emit("roomUsers", {
      room: user.room.id,
      users: getRoomUsers(user.room.id),
    });
  });

  //Listening for chatMessages
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room.id).emit("message", formatMessage(user.username, msg));
  });

  //event to dispatch canvas points
  socket.on("update-canvas", (points) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room.id).emit("update-canvas", points.points);
  });

  socket.on("disconnect", () => {
    const user = userLeave(socket.id);

    if (user) {
      socket.broadcast
        .to(user.room.id)
        .emit(
          "message",
          formatMessage(appName, `${user.username} has left the game!`)
        );
      //Send User and room Info
      io.to(user.room.id).emit("roomUsers", {
        room: user.room.id,
        users: getRoomUsers(user.room.id),
      });
    }
  });
};

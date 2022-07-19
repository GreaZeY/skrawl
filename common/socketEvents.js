const announcer = "Broadcast";
const users = [];

//User joins the game
function userJoin(id, username, room) {
  const user = { id, username, room };

  let userExists = users.filter(usr=>user.id===usr.id)

  if(userExists.length) return userExists[0]
  users.push(user);

  return user;
}

//Get current user
function getCurrentUser(id) {
  return users.find((user) => user.id === id);
}
//User leaves the game
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
        formatMessage(announcer, `${user.username} has joined the game!`)
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
          formatMessage(announcer, `${user.username} has left the game!`)
        );
      //Send User and room Info
      io.to(user.room.id).emit("roomUsers", {
        room: user.room.id,
        users: getRoomUsers(user.room.id),
      });
    }
  });
};

const server = require("http").createServer();
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"]
});
const rooms = {};
io.on("connection", client => {
  client.on("user", (payload) => {
    const user = {
      name: payload.username,
      id: client.id
    };
    if(!rooms[payload.room]){
      rooms[payload.room] = {};
    }
    rooms[payload.room][client.id] = user;
    io.emit("users" + payload.room, Object.values(rooms[payload.room]));
  });

  client.on("send", (payload) => {
    io.emit("message" + payload.room, {
      text: payload.message,
      date: new Date().toISOString(),
      user: rooms[payload.room][client.id]
    });
  });

  client.on("disconnect", () => {
    io.emit("disconnected", client.id);
  });
});
server.listen(3000);

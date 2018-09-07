const path = require("path");
const http = require("http");
const express = require("express");
const publicPath = path.join(__dirname, "../public");
const socketIO = require("socket.io");
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { generateMessage, generateLocationMessage } = require("./utils/message");
const { isString } = require("./utils/validation");
const { User } = require("./utils/users");
const users = new User();
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");

  socket.on("join", (params, callback) => {
    if (!isString(params.username) || !isString(params.room)) {
      return callback("username & room required");
    }

    socket.join(params.room);
    users.leaveChat(socket.id);
    users.joinChat(socket.id, params.username, params.room);

    io.to(params.room).emit("updateUsers", users.getUserList(params.room));
    //implement later -- to leave chat socket.leave(params.room)
    socket.emit(
      "newMessage",
      generateMessage("FitterAdmin", "Welcome to FitterChat!")
    );

    socket.broadcast
      .to(params.room)
      .emit(
        "newMessage",
        generateMessage("FitterAdmin", `${params.username} has joined the chat`)
      );
    callback();
  });

  socket.on("createMessage", message => {
    const user = users.getUser(socket.id);
    if (user && isString(message.text)) {
      io.to(user.room).emit(
        "newMessage",
        generateMessage(user.name, message.text)
      );
    }
  });

  socket.on("createLocationMessage", coords => {
     const user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "newLocationMessage",
        generateLocationMessage(user.name, coords.latitude, coords.longitude)
      );
    }
  });

  socket.on("disconnect", () => {
    const user = users.leaveChat(socket.id);
    if (user) {
      io.to(user.room).emit("updateUsers", users.getUserList(user.room));
      io.to(user.room).emit(
        "newMessage",
        generateMessage("FitterAdmin", `${user.name} has left the chat`)
      );
    }
  });
});

server.listen(port, () => {
  console.log(`app running on localhost://${port}!`);
});

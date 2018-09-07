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
app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");

  socket.on("join", (params, callback) => {
    if (!isString(params.username) || !isString(params.username)) {
      callback("username & room required");
    }

    socket.join(params.room);

    //implement later -- to leave chat socket.leave(params.room)
    socket.emit(
      "newMessage",
      generateMessage("FitterAdmin", "Welcome to FitterChat!")
    );

    socket.broadcast.to(params.room).emit(
      "newMessage",
      generateMessage("FitterAdmin", `${params.username} has joined the chat`)
    );
    callback();
  });

  socket.on("createMessage", message => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("FitterAdmin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`app running on localhost://${port}!`);
});

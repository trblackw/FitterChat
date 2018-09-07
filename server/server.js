//CLEAN SLATE
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

  socket.emit(
    "newMessage",
    generateMessage("Admin", "Welcome to the chat app")
  );

  socket.broadcast.emit(
    "newMessage",
    generateMessage("Admin", "New user joined")
  );

   socket.on("join", (params, callback) => {
      if (!isString(params.username) || !isString(params.username)) {
        callback('username & room required')
      }
      callback();
  });

  socket.on("createMessage", message => {
    console.log("createMessage", message);
    io.emit("newMessage", generateMessage(message.from, message.text));
  });

  socket.on("createLocationMessage", coords => {
    io.emit(
      "newLocationMessage",
      generateLocationMessage("Admin", coords.latitude, coords.longitude)
    );
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`app running on localhost://${port}!`);
});

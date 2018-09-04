//CLEAN SLATE
const path = require("path");
const http = require("http");
const express = require("express");
const publicPath = path.join(__dirname, "../public");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on("connection", socket => {
  console.log("new user connected");
  socket.emit("newMessage", {
    from: "Tucker",
    text: "yooooo",
    createdAt: 120393
  });

  socket.on("createMessage", newMessage => {
    console.log(newMessage);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`app running on localhost://${port}!`);
});

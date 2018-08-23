const express = require("express");
const path = require("path");
const socket = require("socket.io");

const app = express();

app.set("views", path.join(__dirname, "app/views"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", express.static(__dirname + "/"));

app.get("/", function(req, res) {
  res.render("index");
});

const server = app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});

//socket config
const io = socket(server);

io.on("connection", function(socket) {
  console.log("made socket connection: ", socket.id);
  //server listens to all sockets, when it hears 'chat' message, it emits that message and its data to all other listening clients
  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });
   
   socket.on('typing', function(data) {
      socket.broadcast.emit('typing', data)
   })
});

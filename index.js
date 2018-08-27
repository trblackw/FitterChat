const express = require("express");
const path = require("path");
const socket = require("socket.io");
const firebase = require("firebase");

firebase.initializeApp({
  apiKey: "AIzaSyDbBoAoyJMYAqAqsfICYlPQi4SVZiTfqzE",
  authDomain: "fitterchat-96003.firebaseapp.com",
  projectId: "fitterchat-96003",
  databaseURL: "https://fitterchat-96003.firebaseio.com"
});

const firebaseDatabase = firebase.database();

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
  console.log("user made socket connection: ", socket.id);
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("chat", function(data) {
    io.sockets.emit("chat", data);
  });

  socket.on("typing", function(data) {
    socket.broadcast.emit("typing", data);
  });
});

io.on("connection", function(socket) {
  socket.emit("news", { hello: "world" });
  socket.on("my other event", function(data) {
    console.log(data);
  });
});

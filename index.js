const express = require("express");
const path = require("path");
const socket = require("socket.io");
// const firebase = require("firebase");

// firebase.initializeApp({
//   apiKey: "AIzaSyDbBoAoyJMYAqAqsfICYlPQi4SVZiTfqzE",
//   authDomain: "fitterchat-96003.firebaseapp.com",
//   projectId: "fitterchat-96003",
//   databaseURL: "https://fitterchat-96003.firebaseio.com"
// });

// const firebaseDatabase = firebase.database();

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


//NEED TO REFACTOR CODE BELOW TO WORK WITH NAMESPACE/ROOM FUNCTIONALITY (BOTTOM OF FILE) 

// io.on("connection", function(socket) {
//   console.log("user made socket connection: ", socket.id);
//   socket.on("disconnect", function() {
//     console.log("user disconnected");
//   });

//   socket.on("chat", function(data) {
//     io.sockets.emit("chat", data);
//   });

//   socket.on("typing", function(data) {
//     socket.broadcast.emit("typing", data);
//   });
// });

// io.on("connection", function(socket) {
//   socket.emit("news", { hello: "world" });
//   socket.on("my other event", function(data) {
//     console.log(data);
//   });
// });

//name-space config (attempt #1)

//keep track of each chat room; need to implement chatroom ids
const fitterChatRooms = [];

//establish fitterChat namespace
io.of("/fitterChat").on("connection", socket => {
   socket.emit("welcome", "hello and welcome to the trainer-client messaging system");
   
   //create trainer-client room
   socket.on('joinRoom', room => {
      socket.join('trainer-client');
      fitterChatRooms.push(room);
      //incorporate some sort of id for each room
      console.log(room);
      console.log(fitterChatRooms);
   })
});
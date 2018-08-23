const express = require("express");
const path = require("path");
const socket = require("socket.io");

const app = express();

app.set("views", path.join(__dirname, "app/views"));

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.render("index");
});

const server = app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

//socket config
const io = socket(server);

io.on('connection', socket => {
   console.log('made socket connection: ', socket)
})

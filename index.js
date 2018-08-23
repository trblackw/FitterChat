const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();

app.set("views", path.join(__dirname, "app/views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use("/", express.static(__dirname + "/"));

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

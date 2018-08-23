//establish front-end socket connection
// const socket = io.connect("http://localhost:3000/");
const socket = io();

//DOM elements
const userHandle = document.querySelector("#handle");
const userMessage = document.querySelector("#message");
const sendButton = document.querySelector("#send");
const userOutput = document.querySelector("#output");
const messageFeedback = document.querySelector("#feedback");

//emit socket events
//listens for message to be created then sends it to the server
sendButton.addEventListener("click", function() {
  socket.emit("chat", {
    message: userMessage.value,
    handle: userHandle.value
  });
});

//text feedback listener
userMessage.addEventListener("keypress", function() {
  socket.emit("typing", userHandle.value);
});

//Listen for emit events
socket.on("chat", function(data) {
  messageFeedback.innerHTML = "";
  userOutput.innerHTML += `<p><strong>${data.handle}:</strong> ${
    data.message
  }</p>`;
});

socket.on("typing", function(data) {
  messageFeedback.innerHTML = `<p><em>${data}'s typing...</em></p>`;
});

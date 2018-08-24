//establish front-end socket connection
// const socket = io.connect("http://localhost:3000/");
const socket = io();

const formatTime = () => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  return `${hours}:${minutes}:${seconds}`;
};

//DOM elements
const userHandle = document.querySelector("#handle"),
  userMessage = document.querySelector("#message"),
  sendButton = document.querySelector("#send"),
  userOutput = document.querySelector("#output"),
  messageFeedback = document.querySelector("#feedback"),
  chatForm = document.querySelector("#chat-form");

//emit socket events
//listens for message to be created then sends it to the server

//handle message submission

userMessage.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    socket.emit("chat", {
      message: userMessage.value,
      handle: userHandle.value,
      timeStamp: formatTime()
    });
  }
});

chatForm.addEventListener("submit", function(e) {
  e.preventDefault();
  socket.emit("chat", {
    message: userMessage.value,
    handle: userHandle.value,
    timeStamp: formatTime()
  });
  userHandle.disabled = true;
  userMessage.value = "";
});

//clears message input after submit
// chatForm.addEventListener("submit", function(e) {
//   e.preventDefault();
// });

//text feedback listener
userMessage.addEventListener("keypress", function() {
  socket.emit("typing", userHandle.value);
});

//Listen for emit events
socket.on("chat", function(data) {
  messageFeedback.innerHTML = "";
  userOutput.innerHTML += `<p><strong>${data.handle}:</strong> ${
    data.message
  }<small id="timeStamp">${data.timeStamp}</small></p>`;
});

socket.on("typing", function(data) {
  messageFeedback.innerHTML = `<p><em>${data}'s typing...</em></p>`;
});

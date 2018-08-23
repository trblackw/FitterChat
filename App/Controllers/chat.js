//establish front-end socket connection
// const socket = io.connect("http://localhost:3000/");
const socket = io();

const formatTime = stamp => {
  let date = new Date(stamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  return `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
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
      timeStamp: formatTime(e.timeStamp)
    });
  }
});
sendButton.addEventListener("click", function(e) {
  socket.emit("chat", {
    message: userMessage.value,
    handle: userHandle.value,
    timeStamp: formatTime(e.timeStamp)
  });
});

//clears message input after submit
chatForm.addEventListener("submit", function(e) {
  e.preventDefault();
  //prevent user from changing user name
  userHandle.disabled = true;
  userMessage.value = "";
});

//text feedback listener
userMessage.addEventListener("keypress", function() {
  socket.emit("typing", userHandle.value);
});

//Listen for emit events
socket.on("chat", function(data) {
  let formattedTime = new Date(data.timeStamp * 1000);
  messageFeedback.innerHTML = "";
  userOutput.innerHTML += `<p><strong>${data.handle}:</strong> ${
    data.message
  }<small id="timeStamp">${data.timeStamp}</small></p>`;
});

socket.on("typing", function(data) {
  messageFeedback.innerHTML = `<p><em>${data}'s typing...</em></p>`;
});

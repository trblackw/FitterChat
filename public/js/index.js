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

socket.on("connect", function() {
  console.log("connected to server");

  socket.emit("createMessage", {
    from: "jen",
    text: "heyyyyy"
  });
});

socket.on("disconnect", function() {
  console.log("user disconnected");
});

socket.on("newMessage", function(data) {
  console.log(
    `new message from ${data.from}: ${data.text} (${data.createdAt})`,
    data
  );
});

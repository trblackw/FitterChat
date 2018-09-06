const socket = io();

//DOM elements
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("[name=message]");

socket.on("connect", function() {
  console.log("connected to server");
});

socket.on("disconnect", function() {
  console.log("user disconnected from server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
  let li = document.createElement("li");
  li.innerText = `${message.from}: ${message.text}`;
  const messageList = document.querySelector("ol#messages");
  messageList.appendChild(li);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: messageInput.value
  });
});

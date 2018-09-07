const socket = io();

//DOM elements
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("[name=message]");
const messageList = document.querySelector("ol#messages");
const locationButton = document.querySelector("#send-location");

socket.on("connect", () => {
  console.log("connected to server");
});

socket.on("disconnect", () => {
  console.log("user disconnected from server");
});

socket.on("newMessage", message => {
  console.log("newMessage", message);
  let li = document.createElement("li");
  li.innerHTML = `
   <div class="messageTitle">
   <h4>${message.from}</h4>
   <span id="timeStamp">${message.createdAt}</span>
   </div>
  <div class="messageBody"><p>${message.text}</p>
  </div>
  <hr>
  `;
  messageList.appendChild(li);
});

socket.on("newLocationMessage", message => {
  console.log("newLocationMessage", message);
  let li = document.createElement("li");
  li.innerHTML = `
   <div class="messageTitle">
   <h4>${message.from}</h4>
   <span id="timeStamp">${message.createdAt}</span>
   </div>
  <div class="messageBody">${message.from}'s <a href=${
    message.url
  } target="_blank">Location <i class="fas fa-map-marker-alt"></i></a></p>
  </div>
  <hr>
  `;
  messageList.appendChild(li);
});

messageForm.addEventListener("submit", e => {
  e.preventDefault();

  socket.emit("createMessage", {
    from: "User",
    text: messageInput.value
  });
  messageInput.value = "";
});

locationButton.addEventListener("click", () => {
  if (!navigator.geolocation) {
    return alert("Geolocation not supported by your browser!");
  }
  locationButton.disabled = true;
  locationButton.innerText = "Sending Location...";
  navigator.geolocation.getCurrentPosition(
    position => {
      socket.emit("createLocationMessage", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      locationButton.disabled = false;
      locationButton.innerText = "Send Location";
    },
    () => {
      locationButton.disabled = true;
      alert(`oops! we couldn't find you!`);
    }
  );
});

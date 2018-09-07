const socket = io();

const scrollToBottom = () => {
  const newMessage = messageList.querySelector("li:last-child");
  const prevMessage = messageList.querySelector("li:nth-last-child(2)");

  const clientHeight = messageList.clientHeight;
  const scrollTop = messageList.scrollTop;
  const scrollHeight = messageList.scrollHeight;

  const newMessageHeight = getComputedStyle(newMessage, null).getPropertyValue(
    "height"
  );
  const lastMessageHeight = getComputedStyle(
    prevMessage || newMessage,
    null
  ).getPropertyValue("height");

  if (
    clientHeight + scrollTop + newMessageHeight + lastMessageHeight >=
    scrollHeight
  ) {
    messageList.scrollTop = scrollHeight;
  } else {
  }
};

//DOM elements
const messageForm = document.querySelector("#message-form");
const messageInput = document.querySelector("[name=message]");
const messageList = document.querySelector("ol#messages");
const locationButton = document.querySelector("#send-location");

socket.on("connect", () => {
  //vanilla version of jQuery deparam
  const params = {};
  const queryString = window.location.search;
  const decodedQueryString = queryString.replace(
    /([^?=&]+)(=([^&#]*))?/g,
    ($0, $1, $2, $3) => {
      params[$1] = decodeURIComponent($3.replace(/\+/g, "%20"));
      return queryString;
    }
  );

  socket.emit("join", params, err => {
     if (err) {
        alert(err);
        console.log(err);
      window.location.href = "/";
     } else {
        console.log('No errors');
    }
  });
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
  scrollToBottom();
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
  scrollToBottom();
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

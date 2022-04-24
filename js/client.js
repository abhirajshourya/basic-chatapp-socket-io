const socket = io("http://localhost:8000");

const form = document.getElementById("send-box");
const messageInput = document.getElementById("msgin");
const messageContainer = document.querySelector(".container");
var audio = new Audio("./tone.mp3");

const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("msg");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "l" || "m") {
    audio.play();
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, "r");
  socket.emit("send", message);
  messageInput.value = "";
});

const name = prompt("Enter your name");

socket.emit("new-user-joined", name);

socket.on("user-joined", (data) => {
  append(`${data} has joined the chat!`, "m");
});
socket.on("self-welcome", (data) => {
  append(`Welcome to the chat ${data}!`, "m");
});

socket.on("receive", (data) => {
  append(`${data.name}: ${data.message}`, "l");
});

socket.on("left", (data) => {
  append(`${data.name} has disconnected`, "m");
});

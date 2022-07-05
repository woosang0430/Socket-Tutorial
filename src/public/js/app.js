const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to Server ✔");
});

socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.textContent = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

function makeStringRes(type, payload) {
  return JSON.stringify({ type, payload });
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeStringRes("new_message", input.value));
  const li = document.createElement("li");
  li.textContent = `You : ${input.value}`;
  messageList.append(li);
  input.value = "";
}

function handleNicknameSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send(makeStringRes("nickname", input.value));
  input.value = "";
}

messageForm.addEventListener("submit", handleMessageSubmit);

nickForm.addEventListener("submit", handleNicknameSubmit);

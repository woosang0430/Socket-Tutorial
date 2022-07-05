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

function handleSubmit(event, formEl) {
  event.preventDefault();
  const input = formEl.querySelector("input");
  const type = formEl === nickForm ? "nick" : "message";

  const responseJson = {
    type,
    payload: input.value,
  };

  socket.send(JSON.stringify(responseJson));
  input.value = "";
}

function handleMessageSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(makeStringRes("new_message", input.value));
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

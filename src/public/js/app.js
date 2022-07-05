const socket = io();

const welcome = document.querySelector("#welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event) {
  event.preventDefault();

  const input = form.querySelector("input");
  // emit의 마지막 argument로 함수를 넣을 수 있다.
  socket.emit("enter_room", { payload: input.value }, (msg) => {
    console.log(`backend says : ${msg}`);
  });
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

import express from "express";
import WebSocket from "ws";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const server = app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

const wss = new WebSocket.Server({ server });

function onSocketClose() {
  console.log("Disconnected from the Brower ❌");
}

const sockets = [];

wss.on("connection", (socket) => {
  sockets.push(socket);

  socket["nickname"] = "Anonymous";

  console.log("Connected to Browser ✔");
  socket.on("close", onSocketClose);
  socket.on("message", (response) => {
    const object = JSON.parse(response);
    switch (object.type) {
      case "new_message":
        sockets.forEach((aSocket) => {
          aSocket.send(`${socket.nickname}: ${object.payload}`);
          console.log(aSocket.nickname);
        });
        break;
      case "nickname":
        socket["nickname"] = object.payload;
        break;
    }
  });
});

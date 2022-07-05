import http from "http";
import express from "express";
import SocketIO from "socket.io";

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = SocketIO(httpServer);

wsServer.on("connection", (socket) => {
  socket.on("enter_room", (roomName, done) => {
    console.log(roomName);

    setTimeout(() => {
      // 이 친구는 결국에는 front에서 실행이 된다.
      done("Hi frontend");
    }, 5000);
  });
});

httpServer.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

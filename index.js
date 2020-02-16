const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const axios = require("axios");

const port = process.env.PORT || 4000;
const routes = require("./routes/index");

const app = express();

app.use(express.static(path.join(__dirname, "client/build")));
app.use(routes);
const server = http.createServer(app);
const io = socketIo(server);

let gameServer = {
  players: {}
};

class Player {
  constructor(id, name, size, x, y, xVel, yVel) {
    this.id = id;
    this.name = name;
    this.size = size;
    this.x = x;
    this.y = y;
    this.xVel = xVel;
    this.yVel = yVel;
  }
}

const logServerState = message => {
  if (message) {
    console.log("\n======Last Action========================");
    console.log(message);
  }
  console.log("\n=====Server State=====");
  console.log(gameServer.players);
  console.log("======================");
};

const addPlayer = (socketId, playerName) => {
  let xPos = Math.floor(Math.random() * 500);
  let yPos = Math.floor(Math.random() * 500);
  gameServer.players[socketId] = new Player(
    socketId,
    playerName,
    1,
    xPos,
    yPos,
    0,
    0
  );
};

const playerQuit = socketId => {
  delete gameServer.players[socketId];
  logServerState("Client " + socketId.substring(0, 10) + " left.");
  io.emit("updateState", gameServer);
};

// Start socket listening
io.on("connection", socket => {
  let playerName = socket.handshake.query.name;
  addPlayer(socket.id, playerName);
  logServerState("Client " + socket.id.substring(0, 10) + " joined.");

  socket.on("clientGameState", () => {
    io.emit("updateState", gameServer);
  });

  socket.on("updateState", () => {
    io.emit("updateState", gameServer);
  });

  socket.on("disconnect", () => {
    playerQuit(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

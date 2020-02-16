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

let numClients = 0;

// MASTER GAME LOOP BELOW
setInterval(() => {
  if (numClients > 0) {
    movePlayers();
    io.emit("updateState", gameServer);
  }
}, 50);
// MASTER GAME LOOP ABOVE

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
  console.log(numClients + " clients connected");
  console.log("======================");
};

const addPlayer = (socketId, playerName) => {
  let xPos = Math.floor(Math.random() * (370 - 50) + 50);
  let yPos = Math.floor(Math.random() * (635 - 50) + 50);
  gameServer.players[socketId] = new Player(
    socketId,
    playerName,
    1,
    xPos,
    yPos,
    0,
    0
  );
  numClients++;
};

const playerQuit = socketId => {
  delete gameServer.players[socketId];
  numClients--;
  logServerState("Client " + socketId.substring(0, 10) + " left.");
  io.emit("updateState", gameServer);
};

const movePlayers = () => {
  Object.keys(gameServer.players).map(playerId => {
    const player = gameServer.players[playerId];
    player.x += player.xVel;
    player.y -= player.yVel;

    // // slow down
    // if (player.xVel > 0.1) player.xVel - 0.1;
    // else if (player.xVel < -0.1) player.xVel + 0.1;
    // if (player.yVel > 0.1) player.yVel - 0.1;
    // else if (player.yVel < -0.1) player.yVel + 0.1;
  });
};

const playerJoystick = (playerId, xJoy, yJoy) => {
  const player = gameServer.players[playerId];
  if (player != null) {
    player.xVel = xJoy / 26;
    player.yVel = yJoy / 26;
  }
};

// Start socket listening
io.on("connection", socket => {
  let playerName = socket.handshake.query.name;
  addPlayer(socket.id, playerName);
  logServerState("Client " + socket.id.substring(0, 10) + " joined.");

  socket.on("clientGameState", () => {
    io.emit("serverGameState", gameServer);
  });

  socket.on("updateState", () => {
    io.emit("updateState", gameServer);
  });

  socket.on("clientStopPlayer", playerId => {
    const player = gameServer.players[playerId];
    if (player != null) {
      player.xVel = 0;
      player.yVel = 0;
    }
  });

  socket.on("clientJoy", (xJoy, yJoy) => {
    playerJoystick(socket.id, xJoy, yJoy);
  });

  socket.on("disconnect", () => {
    playerQuit(socket.id);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

import Lobby from "./Lobby.jsx";

// const socketUrl = "https://localhost:" + process.env.PORT || 4000;
const socketUrl = "http://localhost:4000/";

class GameContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      gameState: null,
      localPlayerId: null,
      localPlayerName: ""
    };
  }

  joinServer = playerName => {
    this.setState(
      {
        socket: io(socketUrl, {
          query: {
            name: playerName
          }
        })
      },
      () => {
        setTimeout(() => {
          this.activateSockets(playerName);
        }, 300);
      }
    );
  };

  activateSockets = playerName => {
    this.state.socket.emit("clientGameState");
    this.state.socket.on("serverGameState", gameState => {
      this.setState(
        {
          gameState: gameState,
          localPlayerId: this.state.socket.id,
          localPlayerName: playerName
        },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  componentWillUnmount = () => {
    if (this.state.socket) {
      this.state.socket.disconnect();
    }
  };

  render() {
    if (this.state.socket === null) {
      return <Lobby joinServer={this.joinServer} setName={this.setName} />;
    }
    return <GameContainer>{this.state.gameState}</GameContainer>;
  }
}

export default withRouter(GameContainer);

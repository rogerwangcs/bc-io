import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

import Lobby from "./Lobby.jsx";
import Player from "../components/Player";

// const socketUrl = "https://localhost:" + process.env.PORT || 4000;
const socketUrl = "http://localhost:4000/";

const SGameContainer = styled.div`
  width: 1000px;
  height: 1000px;

  background: rgb(58, 55, 87);
  background: radial-gradient(
    circle,
    rgba(58, 55, 87, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

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
        }, 50);
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

    this.state.socket.on("updateState", gameState => {
      this.setState({
        gameState: gameState
      });
    });
  };

  componentWillUnmount = () => {
    if (this.state.socket) {
      this.state.socket.disconnect();
    }
  };

  render() {
    if (this.state.gameState == null) {
      return <Lobby joinServer={this.joinServer} setName={this.setName} />;
    }

    const players = Object.keys(this.state.gameState.players).map(playerId => {
      return (
        <Player
          key={playerId}
          player={this.state.gameState.players[playerId]}
        />
      );
    });

    return <SGameContainer>{players}</SGameContainer>;
  }
}

export default withRouter(GameContainer);

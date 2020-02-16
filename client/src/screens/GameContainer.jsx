import React, { Component } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import io from "socket.io-client";

import { Joystick } from "react-joystick-component";

import Lobby from "./Lobby.jsx";
import Player from "../components/Player";
// import Joystick from "../components/Joystick";

// const socketUrl = "https://localhost:" + process.env.PORT || 4000;
// const socketUrl = "http://localhost:4000/";
const socketUrl = "136.167.87.51:4000/";

const SGameContainer = styled.div`
  width: 370px;
  height: 635px;
  border: 1px solid black;

  background: rgb(58, 55, 87);
  background: radial-gradient(
    circle,
    rgba(58, 55, 87, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
`;

const SJoyStick = styled.div`
  z-index: 10;
  position: fixed;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
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
        }, 10);
      }
    );
  };

  activateSockets = playerName => {
    this.state.socket.emit("clientGameState");
    this.state.socket.on("serverGameState", gameState => {
      this.setState({
        gameState: gameState,
        localPlayerId: this.state.socket.id,
        localPlayerName: playerName
      });
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

  handleMove = event => {
    // console.log(event);
    const xJoy = event.x;
    const yJoy = event.y;
    this.state.socket.emit("clientJoy", xJoy, yJoy);
  };

  handleStop = event => {
    // console.log(event);
    this.state.socket.emit("clientStopPlayer", this.state.localPlayerId);
  };

  render() {
    if (this.state.gameState == null) {
      return <Lobby joinServer={this.joinServer} setName={this.setName} />;
    }

    const players = Object.keys(this.state.gameState.players).map(playerId => {
      return (
        <Player
          key={playerId}
          localPlayerId={this.state.localPlayerId}
          player={this.state.gameState.players[playerId]}
        />
      );
    });

    return (
      <SGameContainer>
        <div>{players}</div>

        <SJoyStick>
          <Joystick
            size={125}
            baseColor="rgba(150,150,150,0.75)"
            stickColor="rgb(230,230,230)"
            throttle={50}
            move={this.handleMove}
            stop={this.handleStop}
          ></Joystick>
        </SJoyStick>
      </SGameContainer>
    );
  }
}

export default withRouter(GameContainer);

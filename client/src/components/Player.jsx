import React from "react";
import styled from "styled-components";

const SPlayer = styled.div`
  z-index: ${props => props.playerZ};
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: ${props => props.color};
  border-radius: 25px;

  left: ${props => props.x + "px"};
  top: ${props => props.y + "px"};

  p {
    color: white;
    transform: translate(-50%, -50%);
    font-size: 12px;
  }
`;

const Player = props => {
  let dat = props.player;
  let playerColor = dat.id === props.localPlayerId ? "blue" : "lightblue";
  let playerZ = dat.id === props.localPlayerId ? "2" : "0";
  return (
    <SPlayer playerZ={playerZ} color={playerColor} x={dat.x} y={dat.y}>
      <p>{dat.name}</p>
    </SPlayer>
  );
};

export default Player;

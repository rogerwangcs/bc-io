import React from "react";
import styled from "styled-components";

const SPlayer = styled.div`
  position: absolute;
  width: 25px;
  height: 25px;
  background-color: blue;
  border-radius: 25px;

  left: ${props => props.x + "px"};
  top: ${props => props.y + "px"};
`;

const Player = props => {
  let dat = props.player;
  console.log(dat);
  return <SPlayer x={dat.x} y={dat.y} />;
};

export default Player;

import React from "react";

export default ({ state }) => {
  const playerStyle = {
    position: "absolute",
    top: `${state.player.position.y}px`,
    left: `${state.player.position.x}px`
  };

  return (
    <div className="game">
      <div className="player" style={playerStyle} />
    </div>
  );
};

import React, { Component } from "react";
import { render } from "react-dom";
import Game from "./Game";

import styles from "../styles/game.css";

const clamp = (min, max, val, offset = 0) => {
  let nextVal;

  if (val <= min) {
    nextVal = min;
  } else if (val >= max) {
    nextVal = max - offset;
  } else {
    nextVal = val;
  }

  return nextVal;
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      player: { position: { x: 0, y: 0 } },
      board: []
    };

    // move this
    this.width = 500;
    this.height = 500;
    this.playerSize = 10;
    this.playerSpeed = 20;

    this.movePlayer = this.movePlayer.bind(this);
    this.keyMap = {};
  }

  componentDidMount() {
    window.addEventListener("keydown", this.movePlayer);
    window.addEventListener("keyup", () => (this.keyMap = {}));
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.movePlayer);
  }

  movePlayer(e) {
    let move = { x: 0, y: 0 };
    let speed = this.playerSpeed;

    this.keyMap[e.key] = true;

    Object.keys(this.keyMap).forEach(key => {
      switch (key) {
        case "ArrowUp":
          move.y = move.y || this.playerSpeed * -1;
          break;
        case "ArrowDown":
          move.y = move.y || this.playerSpeed;
          break;
        case "ArrowRight":
          move.x = move.x || this.playerSpeed;
          break;
        case "ArrowLeft":
          move.x = move.x || this.playerSpeed * -1;
          break;
        default:
          break;
      }
    });

    const currentPosition = this.state.player.position;
    console.log(currentPosition);
    const x = clamp(0, this.width, currentPosition.x + move.x, this.playerSize);
    const y = clamp(
      0,
      this.height,
      currentPosition.y + move.y,
      this.playerSize
    );

    this.setState({
      player: {
        ...this.state.player,
        position: { x, y }
      }
    });
  }

  render() {
    return (
      <div className="container">
        <Game state={this.state} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

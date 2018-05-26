import React, { Component } from "react";
import { render } from "react-dom";
import Game from "./Game";

import styles from "../styles/game.css";

const clamp = (min, max, val, offset) => {
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
    let move;

    this.keyMap[e.key] = true;

    console.log(this.keyMap);

    let o;

    Object.keys(this.keyMap).forEach(key => {
      console.log(key);
    });

    switch (e.key) {
      case "ArrowUp":
        move = [0, -10];
        break;
      case "ArrowDown":
        move = [0, 10];
        break;
      case "ArrowRight":
        move = [10, 0];
        break;
      case "ArrowLeft":
        move = [-10, 0];
        break;
      default:
        break;
    }

    const currentPos = this.state.player.position;
    const x = clamp(0, this.width, currentPos[0] + move[0], this.playerSize);
    const y = clamp(0, this.height, currentPos[1] + move[1], this.playerSize);

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

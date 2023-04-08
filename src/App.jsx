import React, { useState, useEffect } from "react";
import "./App.css";

const height = 10;
const width = 10;

function Board({ initHeight, initWidth }) {
  const [height, setHeight] = useState(initHeight);
  const [width, setWidth] = useState(initHeight);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    setBoard(initBoard());
  }, []);

  const initBoard = () => {
    const ret = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(0);
      }
      ret.push(row);
    }
    return ret;
  };

  const nextBoard = () => {
    const ret = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(board[i][j] === 0 ? 1 : 0);
      }
      ret.push(row);
    }
    return ret;
  };

  return (
    <div className="Board">
      {board.map((row) => (
        <div className="row">
          {row.map((num) => (
            <div className={"cell " + (num === 1 ? "full" : "")}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <div className="menu">
        <h1>Cellular Automata Visualizer</h1>
        <div className="start-button">
          Start
        </div>
      </div>
      <Board initHeight={height} initWidth={width}></Board>
    </div>
  );
}

export default App;

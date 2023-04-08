import React, { useState, useEffect } from "react";
import "./App.css";
import Board from "./Board";

export type Cell = {
  row: number;
  col: number;
  num: number;
};

function App() {
  const [height, setHeight] = useState(10);
  const [width, setWidth] = useState(10);
  const [board, setBoard] = useState<Cell[][]>([]);

  useEffect(() => {
    setBoard(initBoard());
  }, []);

  const initBoard = () => {
    const ret: Cell[][] = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push({ row: i, col: j, num: 0 });
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
        row.push(
          board[i][j].num === 0
            ? { row: i, col: j, num: 1 }
            : { row: i, col: j, num: 0 }
        );
      }
      ret.push(row);
    }
    return ret;
  };

  return (
    <div className="App">
      <div className="menu">
        <h1>Cellular Automata Visualizer</h1>
        <div className="start-button" onClick={() => setBoard(nextBoard)}>
          Start
        </div>
      </div>
      <Board board={board} setBoard={setBoard}></Board>
    </div>
  );
}

export default App;

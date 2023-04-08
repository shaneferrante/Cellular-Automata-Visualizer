import React from "react";
import { Cell } from "./App";

function Board({
  board,
  setBoard,
}: {
  board: Cell[][];
  setBoard: React.Dispatch<React.SetStateAction<Cell[][]>>;
}) {
  return (
    <div className="Board">
      {board.map((row) => (
        <div className="row">
          {row.map((cell) => (
            <div className={"cell " + (cell.num === 1 ? "full" : "")}></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

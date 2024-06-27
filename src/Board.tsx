import React, { useEffect, useRef, useState } from "react";
import { Sizes } from "./App";
import Cell from "./Cell";
import useWindowDimensions from "./windowDimensions";

const sizeToStyle = (s: Sizes) => s === Sizes.Large ? "large" : s === Sizes.Medium ? "medium" : "small";

function Board({
  running,
  size,
  speed,
  mouseDown,
}: {
  running: boolean,
  size: Sizes,
  speed: number,
  mouseDown: boolean,
}) {
  const [grid, setGrid] = useState<boolean[][]>([])
  const firstStart = useRef(true);
  const tick = useRef<NodeJS.Timer>();
  const dimensions = useWindowDimensions();
  const [sizeStyle, setSizeStyle] = useState<string>(sizeToStyle(size));

  useEffect(() => {
    const height = Math.floor((dimensions.height * 0.8) / size);
    const width = Math.floor((dimensions.width * 0.95) / size);
    setGrid(() => initGrid(height, width));
    setSizeStyle(sizeToStyle(size));
  }, [dimensions, size]);

  useEffect(() => {
    if (firstStart.current) {
      firstStart.current = !firstStart.current;
      return;
    }

    if (running) {
      tick.current = setInterval(
        () => setGrid((grid) => nextGrid(grid)),
        speed
      );
    } else {
      clearInterval(tick.current);
    }

    return () => clearInterval(tick.current);
  }, [running, speed]);
  

  // Toggles a particular cell
  const toggleCell = (row: number, col: number) => {
    const newGrid: boolean[][] = grid.slice();
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  // Initializes a 2D Grid of cells to represent the grid.
  const initGrid = (height: number, width: number) => {
    const ret: boolean[][] = [];
    for (let i = 0; i < height; i++) {
      const row = [];
      for (let j = 0; j < width; j++) {
        row.push(false);
      }
      ret.push(row);
    }
    return ret;
  };

  // Helper to count the Alive neighbors of a cell
  const countNeighbors = (row: number, col: number, grid: boolean[][]) => {
    let num = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }
        if (grid[(row + i + grid.length) % grid.length][(col + j + grid[0].length) % grid[0].length]) {
          num++;
        }
      }
    }
    return num;
  };

  // Computes the next Grid value according to the game of life rules
  const nextGrid = (grid: boolean[][]) => {
    const ret = [];
    for (let i = 0; i < grid.length; i++) {
      const row = [];
      for (let j = 0; j < grid[0].length; j++) {
        const neighbors = countNeighbors(i, j, grid);
        let newVal = false;
        if (grid[i][j]) {
          newVal = neighbors === 3 || neighbors === 2;
        } else {
          newVal = neighbors === 3; 
        }
        row.push(newVal);
      }
      ret.push(row);
    }
    return ret;
  };

  return (
    <div className="Board">
      {grid.map((row, r) => (
        <div className="row">
          {row.map((cell, c) => (
            <div>
              <Cell sizeStyle={sizeStyle} activated={cell} toggle={() => toggleCell(r, c)} mouseDown={mouseDown}></Cell>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;

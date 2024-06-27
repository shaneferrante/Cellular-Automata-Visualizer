import React, { useState} from "react";
import ReactSlider from 'react-slider';
import "./App.css";
import Board from "./Board";

export enum Sizes {
  Small = 28,
  Medium = 48,
  Large = 64,
}

function App() {
  const [running, setRunning] = useState(false);
  const [size, setSize] = useState(Sizes.Large);
  const [speed, setSpeed] = useState(500);
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div className="App" onMouseDown={() => setMouseDown(true)} onMouseUp={() => setMouseDown(false)}>
      <div className="menu">
        
        <h1>Cellular Automata Visualizer</h1>
        <div
          className={"start-button " + (running ? "running" : "")}
          onClick={() => setRunning((running) => !running)}
        >
          {running ? "Stop" : "Start"}
        </div>

        <div className="slider-div">
          <p className="slider-p">Size</p>
          <ReactSlider
            className="customSlider"
            marks
            markClassName="customSlider-mark"
            min={0}
            max={2}
            invert={true}
            defaultValue={size}
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            onChange={(val, index) => setSize([Sizes.Small, Sizes.Medium, Sizes.Large][val])} 
          />
        </div>

        <div className="slider-div">
          <p className="slider-p">Speed</p>
          <ReactSlider
            className="customSlider"
            thumbClassName="customSlider-thumb"
            trackClassName="customSlider-track"
            onAfterChange={(val, index) => setSpeed(val)}
            marks
            min={50}
            max={500}
            invert={true}
            defaultValue={speed}
          />
        </div>
      </div>
      <div className="wrap">
        <Board running={running} size={size} speed={speed} mouseDown={mouseDown}></Board>
      </div>
    </div>
  );
}

export default App;

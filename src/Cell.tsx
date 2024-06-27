import React from "react";

function Cell({
  activated,
  sizeStyle,
  toggle,
  mouseDown,
}: {
  activated: boolean;
  sizeStyle: string;
  toggle: any;
  mouseDown: boolean;
}) {
  return (
    <div
      className={"cell " + sizeStyle + " " + (activated ? "full" : "")}
      onClick={toggle}
      onMouseEnter={() => {
        if (mouseDown && !activated) {
          toggle();
        }
      }}
    ></div>
  );
}

export default Cell;

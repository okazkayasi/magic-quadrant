import { Data } from "../../App";
import React, { useEffect, useState } from "react";
import { MAX_LIMIT } from "../TableRow";

const DataPoint: React.FC<{
  data: Data;
  changeLine: (data: Data) => void;
}> = ({ data, changeLine }) => {
  const [moving, setMoving] = useState(false);

  const vision = data.vision ? data.vision : 0;
  const ability = data.ability ? MAX_LIMIT - data.ability : MAX_LIMIT;

  useEffect(() => {
    const drag = (topPerc: number, leftPerc: number) => {
      changeLine({ ...data, vision: leftPerc, ability: MAX_LIMIT - topPerc });
    };
    const addListeners = () => {
      document
        ?.getElementById(`${data.id}-point`)
        ?.addEventListener("mousedown", mouseDown, false);
      window.addEventListener("mouseup", mouseUp, false);
    };

    const mouseUp = () => {
      window.removeEventListener("mousemove", dataPointMove, true);
      setMoving(false);
    };

    const mouseDown = (e: MouseEvent) => {
      window.addEventListener("mousemove", dataPointMove, true);
      setMoving(true);
    };

    const dataPointMove = (e: MouseEvent) => {
      const offsets = document
        ?.getElementById("chart")
        ?.getBoundingClientRect();
      const chartWidth = offsets?.width || 0;
      const chartHeight = offsets?.height || 0;
      const top = offsets?.top;
      const left = offsets?.left;
      const div = document.getElementById(`${data.id}-point`);
      if (div && top && left) {
        const currentTop = e.clientY - top;
        const currentLeft = e.clientX - left;
        let finalTop = parseInt(div.style.top);
        let finalLeft = parseInt(div.style.left);

        finalTop = Math.max(0, Math.min(currentTop, chartHeight));
        finalLeft = Math.max(0, Math.min(currentLeft, chartWidth));

        const topPerc = (finalTop * MAX_LIMIT) / chartHeight;
        const leftPerc = (finalLeft * MAX_LIMIT) / chartWidth;
        drag(
          Math.round(topPerc * MAX_LIMIT) / MAX_LIMIT,
          Math.round(leftPerc * MAX_LIMIT) / MAX_LIMIT
        );
      }
    };

    addListeners();
    return () => {
      document
        ?.getElementById(`${data.id}-point`)
        ?.removeEventListener("mousedown", mouseDown, false);
    };
  }, [data, changeLine]);

  const opacity = data.checked ? 1 : 0.5;

  return (
    <>
      <div
        id={data.id + "-point"}
        className="data_wrapper"
        style={{
          top: `${ability}%`,
          left: `${vision}%`,
          opacity: opacity,
        }}
      >
        <p>{data.label}</p>
      </div>
      {moving && (
        <>
          <div
            className="data_moving data_moving_horizontal"
            style={{
              left: 0,
              top: `${ability}%`,
              width: `${vision}%`,
              height: 0,
              borderTop: "3px dashed red",
            }}
          />
          <div
            className="data_moving data_moving_vertical"
            style={{
              left: `${vision}%`,
              bottom: 0,
              width: 0,
              height: `${100 - ability}%`,
              borderLeft: "3px dashed red",
            }}
          />
          <div
            className="data_moving data_moving_area"
            style={{
              left: 0,
              bottom: 0,
              width: `${vision}%`,
              height: `${100 - ability}%`,
            }}
          />
        </>
      )}
    </>
  );
};

export default DataPoint;

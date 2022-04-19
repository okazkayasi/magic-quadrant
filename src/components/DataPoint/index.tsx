import { Data } from "../../App";
import React, { useEffect } from "react";

const DataPoint: React.FC<{
  data: Data;
  changeLine: (data: Data) => void;
}> = ({ data, changeLine }) => {
  const vision = data.vision ? data.vision : 0;
  const ability = data.ability ? 100 - data.ability : 100;

  useEffect(() => {
    const drag = (topPerc: number, leftPerc: number) => {
      changeLine({ ...data, vision: leftPerc, ability: 100 - topPerc });
    };
    const addListeners = () => {
      document
        ?.getElementById(`${data.id}-point`)
        ?.addEventListener("mousedown", mouseDown, false);
      window.addEventListener("mouseup", mouseUp, false);
    };

    const mouseUp = () => {
      window.removeEventListener("mousemove", divMove, true);
    };

    const mouseDown = (e: MouseEvent) => {
      window.addEventListener("mousemove", divMove, true);
    };

    const divMove = (e: MouseEvent) => {
      let offsets = document?.getElementById("chart")?.getBoundingClientRect();
      const chartWidth = offsets?.width || 0;
      const chartHeight = offsets?.height || 0;
      let top = offsets?.top;
      let left = offsets?.left;
      let div = document.getElementById(`${data.id}-point`);
      if (div && top && left) {
        const currentTop = e.clientY - top;
        const currentLeft = e.clientX - left;
        let finalTop = parseInt(div.style.top);
        let finalLeft = parseInt(div.style.left);

        if (currentTop >= 0) {
          div.style.top = Math.min(currentTop, chartHeight) + "px";
          finalTop = Math.min(currentTop, chartHeight);
        }
        if (currentLeft >= 0) {
          div.style.left = Math.min(currentLeft, chartWidth) + "px";
          finalLeft = Math.min(currentLeft, chartWidth);
        }

        if (
          finalTop !== parseInt(div.style.top) ||
          finalLeft !== parseInt(div.style.left)
        ) {
          const topPerc = (finalTop * 100) / chartHeight;
          const leftPerc = (finalLeft * 100) / chartWidth;
          drag(
            Math.round(topPerc * 100) / 100,
            Math.round(leftPerc * 100) / 100
          );
        }
      }
    };
    addListeners();
    return () => {
      document
        ?.getElementById(`${data.id}-point`)
        ?.removeEventListener("mousedown", mouseDown, false);
    };
  }, [data, changeLine]);

  return (
    <div
      id={data.id + "-point"}
      className="data_wrapper"
      style={{
        top: `${ability}%`,
        left: `${vision}%`,
      }}
    >
      <p>{data.label}</p>
    </div>
  );
};

export default DataPoint;

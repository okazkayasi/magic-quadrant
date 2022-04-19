import { Data } from "../../App";
import React, { useEffect } from "react";

const DataPoint: React.FC<{
  data: Data;
  changeLine: (data: Data) => void;
}> = ({ data, changeLine }) => {
  const vision = data.vision ? data.vision : 0;
  const ability = data.ability ? 100 - data.ability : 100;

  useEffect(() => {
    const drag = (top_perc: number, left_perc: number) => {
      changeLine({ ...data, vision: left_perc, ability: 100 - top_perc });
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
      const chart_width = offsets?.width || 0;
      const chart_height = offsets?.height || 0;
      let top = offsets?.top;
      let left = offsets?.left;
      let div = document.getElementById(`${data.id}-point`);
      if (div && top && left) {
        const cur_top = e.clientY - top;
        const cur_left = e.clientX - left;
        let final_top = parseInt(div.style.top);
        let final_left = parseInt(div.style.left);
        if (cur_top <= chart_height && cur_top >= 0) {
          div.style.top = cur_top + "px";
          final_top = cur_top;
        }
        if (cur_left <= chart_width && cur_left >= 0) {
          div.style.left = cur_left + "px";
          final_left = cur_left;
        } else if (cur_left > chart_width) {
        //   window.removeEventListener("mousemove", divMove, true);
        }
        if (
          final_top !== parseInt(div.style.top) ||
          final_left !== parseInt(div.style.left)
        ) {
          const top_perc = final_top / 4;
          const left_perc = final_left / 4;
          drag(
            Math.round(top_perc * 100) / 100,
            Math.round(left_perc * 100) / 100
          );
        }
      }
    };
    addListeners();
    return () => {
      document
        ?.getElementById(`${data.id}-point`)
        ?.removeEventListener("mousedown", mouseDown, false);
    //   window.removeEventListener("mouseup", mouseUp, false);
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

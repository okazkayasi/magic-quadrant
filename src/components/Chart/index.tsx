import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Data } from "../../App";

const DataPoint: React.FC<{
  data: Data;
  changeData: (data: Data) => void;
}> = ({ data, changeData }) => {
  const vision = data.vision ? data.vision : 0;
  const ability = data.ability ? 100 - data.ability : 100;

  const drag = (top_perc: number, left_perc: number) => {
    changeData({ ...data, vision: left_perc, ability: 100 - top_perc });
  };

  useEffect(() => {
    function addListeners() {
      document
        ?.getElementById(`${data.id}-point`)
        ?.addEventListener("mousedown", mouseDown, false);
      window.addEventListener("mouseup", mouseUp, false);
    }

    function mouseUp() {
      window.removeEventListener("mousemove", divMove, true);
    }

    function mouseDown(e: MouseEvent) {
      window.addEventListener("mousemove", divMove, true);
    }

    function divMove(e: MouseEvent) {
      var offsets = document?.getElementById("chart")?.getBoundingClientRect();
      var top = offsets?.top;
      var left = offsets?.left;
      var div = document.getElementById(`${data.id}-point`);
      if (div && top && left) {
        const cur_top = e.clientY - top;
        const cur_left = e.clientX - left;
        let final_top = parseInt(div.style.top);
        let final_left = parseInt(div.style.left);
        if (cur_top <= 400 && cur_top >= 0) {
          div.style.top = cur_top + "px";
          final_top = cur_top;
        }
        if (cur_left <= 400 && cur_left >= 0) {
          div.style.left = cur_left + "px";
          final_left = cur_left;
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
    }
    addListeners();
    return () => {
      window.removeEventListener("mousemove", divMove, true);
    };
  }, []);

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

const Chart: React.FC<{
  data_list: Data[];
  changeData: (data: Data) => void;
}> = ({ data_list, changeData }) => {
  return (
    <div>
      <div className="chart_wrapper">
        <div className="left_axis_wrapper">
          <p>{"Ability to execute ->"}</p>
        </div>
        <div>
          <div className="chart_container" id="chart">
            <div className="chart_row">
              <div>
                <p>Challengers</p>
              </div>
              <div>
                <p>Leaders</p>
              </div>
            </div>
            <div className="chart_row chart_row_second">
              <div>
                <p>Niche Players</p>
              </div>
              <div>
                <p>Visionaries</p>
              </div>
            </div>
            {data_list &&
              data_list.length > 0 &&
              data_list.map((data, i) => (
                <DataPoint data={data} key={data.id} changeData={changeData} />
              ))}
          </div>
          <div className="bottom_axis_wrapper">
            <p>{"Completeness of vision ->"}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chart;

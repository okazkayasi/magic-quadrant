import React from "react";
import "./Chart.css";

const Chart = () => {
  return (
    <div className="chart_wrapper">
      <div className="left_axis_wrapper">
        <p>{"Ability to execute ->"}</p>
      </div>
      <div>
        <div className="chart_container">
          <div className="chart_row">
            <div>
              <p>Challengers</p>
            </div>
            <div>
              <p>Leaders</p>
            </div>
          </div>
          <div className="chart_row">
            <div>
              <p>Niche Players</p>
            </div>
            <div>
              <p>Visionaries</p>
            </div>
          </div>
        </div>
        <div className="bottom_axis_wrapper">
          <p>{"Completeness of vision ->"}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;

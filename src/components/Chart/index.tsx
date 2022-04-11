import React, { useEffect, useState } from "react";
import "./Chart.css";
import { Data } from "../../App";

const DataPoint: React.FC<{
  data: Data;
}> = ({ data }) => {
  const vision = data.vision ? data.vision : 0;
  const ability = data.ability ? 100 - data.ability : 100;

  
  useEffect(() => {
    first
  
    return () => {
      second
    }
  }, [third])
  


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
          <div className="chart_row chart_row_second">
            <div>
              <p>Niche Players</p>
            </div>
            <div>
              <p>Visionaries</p>
            </div>
          </div>
          {data_list.map((data) => (
            <DataPoint data={data} key={data.id} />
          ))}
        </div>
        <div className="bottom_axis_wrapper">
          <p>{"Completeness of vision ->"}</p>
        </div>
      </div>
    </div>
  );
};

export default Chart;

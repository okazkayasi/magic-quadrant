import React from "react";
import "./Chart.css";
import { Data } from "../../App";
import DataPoint from "../DataPoint";

const Chart: React.FC<{
  data_list: Data[];
  changeLine: (data: Data) => void;
}> = ({ data_list, changeLine }) => {
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
                <DataPoint data={data} key={data.id} changeLine={changeLine} />
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

import React, { useState } from "react";
import "./Table.css";
import { Data } from "../../App";

const TableRow: React.FC<{
  data: Data;
  deleteLine: (id: string) => void;
  changeData: (data: Data) => void;
}> = ({ data, deleteLine, changeData }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name !== "label") {
      // check if value is in limits
      const value_float = parseFloat(value);
      if (value_float < 0 || value_float > 100) {
        return;
      }
    }
    changeData({
      ...data,
      [name]: name === "label" ? value : parseFloat(value),
    });
  };

  return (
    <div className="table_row">
      <div className="input_wrapper">
        <input
          type="text"
          name="label"
          value={data.label}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          name="vision"
          value={data.vision}
          onChange={onChange}
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          min="0"
          max="100"
          name="ability"
          value={data.ability}
          onChange={onChange}
        />
      </div>
      <div>
        <button onClick={() => deleteLine(data.id)}>Delete</button>
      </div>
    </div>
  );
};

const Table: React.FC<{
  data_list: Data[];
  addNewLine: () => void;
  deleteLine: (id: string) => void;
  changeData: (data: Data) => void;
}> = ({ data_list, addNewLine, deleteLine, changeData }) => {
  return (
    <div className="table_container">
      <div className="add_button_wrapper">
        <button onClick={addNewLine}>Add</button>
      </div>
      <div className="table_head">
        <div className="label_container">
          <p>Label</p>
        </div>
        <div>
          <p>Vision</p>
        </div>
        <div>
          <p>Ability</p>
        </div>
        <div>
          <p>Delete</p>
        </div>
      </div>
      <div className="table_body">
        {data_list.map((data) => (
          <TableRow
            key={data.id}
            data={data}
            deleteLine={deleteLine}
            changeData={changeData}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;

import React from "react";
import "./Table.css";
import { Data } from "../../App";
import TableRow from "../TableRow";

const Table: React.FC<{
  dataList: Data[];
  addNewLine: () => void;
  deleteLine: (id: number) => void;
  changeLine: (data: Data) => void;
}> = ({ dataList, addNewLine, deleteLine, changeLine }) => {
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
        {dataList.map((data) => (
          <TableRow
            key={data.id}
            data={data}
            deleteLine={deleteLine}
            changeLine={changeLine}
          />
        ))}
      </div>
    </div>
  );
};

export default Table;

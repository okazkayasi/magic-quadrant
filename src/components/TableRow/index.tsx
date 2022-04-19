import React from "react";
import { Data } from "../../App";

const NumberInput: React.FC<{
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ name, value, onChange }) => {
  return (
    <input
      type="number"
      step="0.01"
      min="0"
      max="100"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

const TableRow: React.FC<{
  data: Data;
  deleteLine: (id: number) => void;
  changeLine: (data: Data) => void;
}> = ({ data, deleteLine, changeLine }) => {
  const onFloatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const value_float = parseFloat(value);

    // check if value is in limits
    if (value_float < 0 || value_float > 100) {
      return;
    }
    changeLine({
      ...data,
      [name]: value_float,
    });
  };

  const onStringChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    changeLine({
      ...data,
      [name]: value,
    });
  };

  return (
    <div className="table_row">
      <div className="input_wrapper">
        <input
          type="text"
          name="label"
          value={data.label}
          onChange={onStringChange}
        />
      </div>
      <div>
        <NumberInput
          name="vision"
          value={data.vision}
          onChange={onFloatChange}
        />
      </div>
      <div>
        <NumberInput
          name="ability"
          value={data.ability}
          onChange={onFloatChange}
        />
      </div>
      <div>
        <button onClick={() => deleteLine(data.id)}>Delete</button>
      </div>
    </div>
  );
};
export default TableRow;

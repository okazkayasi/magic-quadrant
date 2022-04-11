import Chart from "./components/Chart";
import Table from "./components/Table";
import "./App.css";
import { useState } from "react";

export type Data = {
  id: string;
  label: string;
  vision: number;
  ability: number;
};

function App() {
  const [dataList, setDataList] = useState([] as Data[]);

  const addNewLine = () => {
    let new_id = 0;
    if (dataList.length > 0) {
      const all_ids = dataList.map((d) => parseInt(d.id));
      const last_id = Math.max(...all_ids);
      new_id = last_id + 1;
    }

    setDataList((dataList) => [
      ...dataList,
      { id: new_id + "", label: "", vision: 0, ability: 0 },
    ]);
  };

  const changeData = (data: Data) => {
    const data_ind = dataList.findIndex((d) => d.id === data.id);
    setDataList((dataList) => [
      ...dataList.slice(0, data_ind),
      data,
      ...dataList.slice(data_ind + 1),
    ]);
  };

  const deleteLine = (id: string) => {
    setDataList((dataList) => dataList.filter((d) => d.id !== id));
  };

  console.log(dataList, "datalist");
  return (
    <div className="App">
      <Chart data_list={dataList} changeData={changeData} />
      <Table
        data_list={dataList}
        addNewLine={addNewLine}
        deleteLine={deleteLine}
        changeData={changeData}
      />
    </div>
  );
}

export default App;

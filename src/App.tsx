import Chart from "./components/Chart";
import Table from "./components/Table";
import "./App.css";
import { useEffect, useState } from "react";

export type Data = {
  id: string;
  label: string;
  vision: number;
  ability: number;
};

function App() {
  const [dataList, setDataList] = useState([] as Data[]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") || "[]");
    setDataList(data);
  }, []);

  const addNewLine = () => {
    let new_id = 0;
    if (dataList.length > 0) {
      const all_ids = dataList.map((d) => parseInt(d.id));
      const last_id = Math.max(...all_ids);
      new_id = last_id + 1;
    }

    setDataList((dataList) => [
      ...dataList,
      { id: new_id + "", label: "New", vision: 0, ability: 0 },
    ]);
    localStorage.setItem("data", JSON.stringify(dataList));
  };

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(dataList));
  }, [dataList]);

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

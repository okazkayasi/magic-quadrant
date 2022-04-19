import Chart from "./components/Chart";
import Table from "./components/Table";
import "./App.css";
import { useEffect, useState } from "react";

export type Data = {
  id: number;
  label: string;
  vision: number;
  ability: number;
};

function App() {
  const [dataList, setDataList] = useState([] as Data[]);

  useEffect(() => {
    const data_from_storage = localStorage.getItem("data");
    if (data_from_storage) {
      setDataList(JSON.parse(data_from_storage));
    } else {
      localStorage.setItem("data", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(dataList));
  }, [dataList]);

  const addNewLine = () => {
    const new_id = dataList.length + 1;
    setDataList([
      ...dataList,
      { id: new_id, label: "New", vision: 0, ability: 0 },
    ]);
    localStorage.setItem("data", JSON.stringify(dataList));
  };

  const changeLine = (data: Data) => {
    const data_ind = dataList.findIndex((d) => d.id === data.id);
    setDataList([
      ...dataList.slice(0, data_ind),
      data,
      ...dataList.slice(data_ind + 1),
    ]);
  };

  const deleteLine = (id: number) => {
    setDataList(dataList.filter((d) => d.id !== id));
  };

  return (
    <div className="App">
      <Chart data_list={dataList} changeLine={changeLine} />
      <Table
        data_list={dataList}
        addNewLine={addNewLine}
        deleteLine={deleteLine}
        changeLine={changeLine}
      />
    </div>
  );
}

export default App;

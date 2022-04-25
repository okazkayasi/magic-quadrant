import Chart from "./components/Chart";
import Table from "./components/Table";
import "./App.css";
import { useEffect, useState } from "react";

export type Data = {
  id: number;
  label: string;
  vision: number;
  ability: number;
  checked: boolean;
};

const App = () => {
  const [dataList, setDataList] = useState([] as Data[]);

  useEffect(() => {
    const dataFromStorage = localStorage.getItem("data");
    if (dataFromStorage) {
      setDataList(JSON.parse(dataFromStorage));
    } else {
      localStorage.setItem("data", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(dataList));
  }, [dataList]);

  const addNewLine = () => {
    const newId = dataList.length + 1;
    setDataList([
      ...dataList,
      { id: newId, label: "New", vision: 0, ability: 0, checked: false },
    ]);
    localStorage.setItem("data", JSON.stringify(dataList));
  };

  const changeLine = (data: Data) => {
    const dataInd = dataList.findIndex((d) => d.id === data.id);
    setDataList([
      ...dataList.slice(0, dataInd),
      data,
      ...dataList.slice(dataInd + 1),
    ]);
  };

  const deleteLine = (id: number) => {
    setDataList(dataList.filter((d) => d.id !== id));
  };

  return (
    <div className="App">
      <Chart dataList={dataList} changeLine={changeLine} />
      <Table
        dataList={dataList}
        addNewLine={addNewLine}
        deleteLine={deleteLine}
        changeLine={changeLine}
      />
    </div>
  );
};

export default App;

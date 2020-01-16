import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import DevFormEdit from "./components/DevFormEdit";

function App() {
  const [devs, setDevs] = useState([]);
  const [devEdit, setDevEdit] = useState(null);
  const [formEdit, setFormEdit] = useState(false);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs");
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    setDevs([...devs, response.data]);
  }

  async function handleRemove(data) {
    const filterDevs = devs.filter(dev => dev._id !== data);
    setDevs(filterDevs);

    await api.delete(`/devs/${data}`);
  }

  function handleEdit(data) {
    const devFind = devs.find(dev => dev._id === data);
    setDevEdit(devFind);
    setFormEdit(true);
  }

  async function handleEditDev(dev, id) {
    const response = await api.put(`/devs/${id}`, dev);

    const index = devs.findIndex(dev => dev._id === id);

    let newArr = [...devs];
    newArr[index] = response.data;
    setDevs(newArr);
    setFormEdit(false);
  }

  return (
    <div id="app">
      <aside>
        <strong>Registrar</strong>
        {formEdit ? (
          <DevFormEdit onSubmit={handleEditDev} found={devEdit} />
        ) : (
          <DevForm onSubmit={handleAddDev} />
        )}
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem
              key={dev._id}
              dev={dev}
              onClick={handleRemove}
              onClickEdit={handleEdit}
            />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

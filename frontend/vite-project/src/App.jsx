import { useState, useEffect } from "react";
import style from "./App.module.css";
import axios from "axios";
import image_1 from "./images/pencil.svg";
import image_2 from "./images/trash.svg";

function App() {
  const [array, setArray] = useState([]);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  async function getAllData() {
    const response = await axios.get("http://localhost:3000/tasks/");
    setArray(response.data);
  }
  async function createData() {
    try {
      if (!input1.length) throw new Error("Title empty");
      if (!input2.length) throw new Error("Description empty");

      const response = await axios.post("http://localhost:3000/tasks/", {
        title: input1,
        description: input2,
        completed: false,
        createdat: "2024-01-25T11:30:00.000Z",
      });
      console.log(response);
      setArray(response.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <>
      <div className={style.marginContainer}>
        <div className={style.container}>
          <h1>TODO LIST</h1>
          <div className={style.inputsContainer}>
            <input
              className={style.createTitle}
              placeholder="Create note..."
              onChange={(e) => {
                setInput1(e.target.value);
              }}
            ></input>
            <input
              className={style.createDescription}
              placeholder="Create description note..."
              onChange={(e) => {
                setInput2(e.target.value);
              }}
            ></input>
            <button onClick={createData}>CREATE</button>
          </div>
          <div className={style.tasksContainer}>
            {array.map((el, index) => (
              <div className={style.task} key={index}>
                <input type="checkbox"></input>
                <h4>{el.title}</h4>
                <p>{el.description}</p>
                <div className={style.iconsContainer}>
                  <img src={image_1}></img>
                  <img src={image_2}></img>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

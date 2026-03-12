import { useState, useEffect } from "react";
import style from "./App.module.css";
import axios from "axios";
import image_1 from "./images/pencil.svg";
import image_2 from "./images/trash.svg";

function App() {
  const [array, setArray] = useState([]);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [modal, setModal] = useState(false);

  const modalShow = () => {
    setModal(true);
  };

  const cancelBtn = () => {
    setModal(false);
  };

  async function getAllData() {
    const response = await axios.get("http://localhost:3000/tasks/");
    setArray([...array, ...response.data]);
  }
  async function createData() {
    try {
      if (!input1.length) throw new Error("title empty");
      if (!input2.length) throw new Error("description empty");

      const response = await axios.post("http://localhost:3000/tasks/", {
        title: input1,
        description: input2,
        completed: false,
        createdat: "2024-01-25T11:30:00.000Z",
      });
      console.log(response);
      setArray([...array, ...response.data]);
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
                  <img onClick={modalShow} src={image_1}></img>
                  <img src={image_2}></img>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={style.overlay} style={{ display: modal ? "block" : "none" }} />
        <div className={style.modalContainer} style={{ display: modal ? "block" : "none" }}>
          <h1>Update Note</h1>
          <input type="text" placeholder="Input your note..." />
          <input type="text" placeholder="Input your description note..." />
          <div className={style.buttonWrapper}>
            <button className={style.cancelBtn} onClick={cancelBtn}>
              Cancel
            </button>
            <button className={style.applyBtn}>Apply</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

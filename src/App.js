import "./App.css";
import React, { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");
export const CookieContext = React.createContext();

function App() {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = () => {
    fetch(`${process.env.REACT_APP_ORIGIN}/api/tasks/`)
      .then((response) => response.json())
      .then((data) => setTasks(data));
  };
  return (
    <CookieContext.Provider value={csrftoken}>
      <div className="App">
        <div className="col-md-5 offset-md-3 border border-warning rounded mt-5 px-2 pb-3">
          <TaskForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            fetchTasks={fetchTasks}
          />
          <TaskList tasks={tasks} fetchTasks={fetchTasks} />
        </div>
      </div>
    </CookieContext.Provider>
  );
}

export default App;

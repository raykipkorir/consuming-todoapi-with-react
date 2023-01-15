import React, { useContext, useState } from "react";
import { CookieContext } from "../App";

function TaskItem({ task, fetchTasks }) {
  const [checked, setChecked] = useState(task.completed);
  const csrftoken = useContext(CookieContext);
  const editDeleteUrl = `${process.env.REACT_APP_ORIGIN}/api/tasks/${task.id}/`;
  
  const editTask = () => {
    const updatedTask = prompt("Update task", task.name);
    if (!(updatedTask === "" || null)) {
      const options = {
        method: "PUT",
        body: JSON.stringify({ name: updatedTask }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFTOKEN": csrftoken,
        },
      };
      fetch(editDeleteUrl, options).then(() => fetchTasks());
    }
  };
  const deleteTask = () => {
    const options = {
      method: "DELETE",
      headers: {
        "X-CSRFTOKEN": csrftoken,
      },
    };
    fetch(editDeleteUrl, options).then(() => fetchTasks());
  };
  
  const completedChangeHandler = () => {
    const updateCheck = checked === true ? false : true;
    const options = {
      method: "PATCH",
      body: JSON.stringify({ completed: updateCheck }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrftoken,
      },
    };
    fetch(editDeleteUrl, options).then(() => setChecked(() => updateCheck));
  };
  return (
    <React.Fragment>
      <li className="list-group-item d-flex justify-content-between">
        <span>{task.name}</span>
        <div className="d-flex justify-content-around align-items-center">
          <input
            type="checkbox"
            onChange={completedChangeHandler}
            checked={checked}
          />
          <i className="fa-solid fa-pen-to-square px-2" onClick={editTask}></i>
          <i className="fa-solid fa-trash" onClick={deleteTask}></i>
        </div>
      </li>
    </React.Fragment>
  );
}

export default TaskItem;

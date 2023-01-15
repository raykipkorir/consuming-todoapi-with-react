import React, { useContext } from "react";
import { CookieContext } from "../App";

function TaskForm({ inputValue, setInputValue, fetchTasks }) {
  const csrftoken = useContext(CookieContext);

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const submittedData = e.target[0].value;
    if (!(submittedData === "" || null)) {
      const options = {
        method: "POST",
        body: JSON.stringify({ name: submittedData }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      };
      fetch(`${process.env.REACT_APP_ORIGIN}/api/tasks/`, options)
        .then((response) => response.json())
        .then((content) => {
          setInputValue("");
          fetchTasks();
        });
    }
  };

  return (
    <React.Fragment>
      <form className="input-group my-3" onSubmit={formSubmitHandler}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={inputValue}
          onChange={inputChangeHandler}
        />
        <button className="btn btn-outline-success">Add</button>
      </form>
    </React.Fragment>
  );
}

export default TaskForm;

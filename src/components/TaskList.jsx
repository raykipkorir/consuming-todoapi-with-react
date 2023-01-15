import React, { useEffect } from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, fetchTasks }) {
  useEffect(() => {
    fetchTasks();
  }, []);
  return (
    <div>
      <ul className="list-group">
        {tasks.map((task) => {
          return <TaskItem key={task.id} task={task} fetchTasks={fetchTasks} />;
        })}
      </ul>
    </div>
  );
}

export default TaskList;

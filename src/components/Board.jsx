import React from "react";
import Column from "./Column";

const columns = ["To Do", "In Progress", "Done"];

export default function Board({ tasks, setTasks }) {
  return (
    <div className="board">
      {columns.map((col) => (
        <Column
          key={col}
          status={col}
          tasks={tasks.filter((t) => t.status === col)}
          setTasks={setTasks}
          allTasks={tasks}
        />
      ))}
    </div>
  );
}

import React, { useState, memo } from "react";
import { useDrop } from "react-dnd";
import Card from "./Card";
import TaskForm from "./TaskForm";

function Column({ status, tasks, setTasks, allTasks }) {
  const [showForm, setShowForm] = useState(false);

  const [, drop] = useDrop({
    accept: "CARD",
    drop: (item) => {
      if (item.status !== status) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === item.id ? { ...t, status } : t
          )
        );
      }
    },
  });

  const addTask = (task) => {
    setTasks((prev) => [...prev, task]);
    setShowForm(false);
  };

  return (
    <div ref={drop} className="column">
      <div className="column-header">
        <h2>{status}</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>+ Add</button>
      </div>

      {showForm && <TaskForm status={status} addTask={addTask} />}

      {tasks.map((task, index) => (
        <Card key={task.id} task={task} setTasks={setTasks} index={index} currentColumn={status} />
      ))}
    </div>
  );
}

export default memo(Column);

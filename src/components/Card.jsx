import React, { useState, memo } from "react";
import { useDrag, useDrop } from "react-dnd";

function Card({ task, setTasks, index, currentColumn }) {
  const [showDesc, setShowDesc] = useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: task.id, index, status: currentColumn },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // Allow reordering within the same column
  const [, drop] = useDrop({
    accept: "CARD",
    hover: (draggedItem) => {
      if (draggedItem.id !== task.id && draggedItem.status === currentColumn) {
        setTasks((prev) => {
          const updated = [...prev];
          const draggedIndex = updated.findIndex((t) => t.id === draggedItem.id);
          const targetIndex = updated.findIndex((t) => t.id === task.id);

          // Swap positions within the same column
          if (draggedIndex > -1 && targetIndex > -1) {
            const [movedCard] = updated.splice(draggedIndex, 1);
            updated.splice(targetIndex, 0, movedCard);
          }
          return updated;
        });
        draggedItem.index = index;
      }
    },
  });

  const deleteTask = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3>{task.title}</h3>
      <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
      <p className="date">{task.date}</p>

      <button onClick={() => setShowDesc(!showDesc)}>
        {showDesc ? "Hide" : "Show"} Description
      </button>

      {showDesc && <p className="card-desc">{task.description}</p>}

      <button className="delete-btn" onClick={deleteTask}>Delete</button>
    </div>
  );
}

export default memo(Card);

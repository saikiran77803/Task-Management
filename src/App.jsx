import React, { useState, useMemo } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";
import SearchFilter from "./components/SearchFilter";
import ThemeToggle from "./components/ThemeToggle";
import { useLocalStorage } from "./Hooks/useLocalStorage";
import "./index.css";

export default function App() {
  const [tasks, setTasks] = useLocalStorage("kanbanTasks", []);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) &&
        (priorityFilter ? task.priority === priorityFilter : true)
    );
  }, [tasks, search, priorityFilter]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app-container">
        <header className="header">
          <h1>Kanban Board</h1>
          <ThemeToggle />
        </header>

        <SearchFilter
          search={search}
          setSearch={setSearch}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        <Board tasks={filteredTasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

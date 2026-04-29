import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TaskForm({ onSubmit, existingTask }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState(existingTask?.title || "");
  const [dateType, setDateType] = useState("today");
  const [customDate, setCustomDate] = useState(existingTask?.date || "");
  const [status, setStatus] = useState(existingTask?.status || "pending");

  const getDate = () => {
    const today = new Date();

    if (dateType === "today") return today.toISOString().split("T")[0];

    if (dateType === "tomorrow") {
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);
      return tomorrow.toISOString().split("T")[0];
    }

    return customDate;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: existingTask ? existingTask.id : Date.now(),
      title,
      date: getDate(),
      status,
      completed: existingTask?.completed || false
    };

    onSubmit(newTask);
    navigate("/tasks");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Date Selection */}
      <label>Task Date:</label>
      <select value={dateType} onChange={(e) => setDateType(e.target.value)}>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
        <option value="custom">Custom</option>
      </select>

      {dateType === "custom" && (
        <input
          type="date"
          value={customDate}
          onChange={(e) => setCustomDate(e.target.value)}
        />
      )}

      {/* Status Selection */}
      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <button type="submit">Save Task</button>
    </form>
  );
}

export default TaskForm;
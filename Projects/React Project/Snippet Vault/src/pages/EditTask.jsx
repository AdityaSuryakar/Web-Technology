import { useParams, useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";

function EditTask({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const task = tasks.find(t => t.id === Number(id));

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    navigate("/tasks");
  };

  return (
    <div className="container">
      <h2>✏️ Edit Task</h2>
      <TaskForm onSubmit={updateTask} existingTask={task} />
    </div>
  );
}

export default EditTask;
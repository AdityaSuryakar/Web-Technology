import TaskForm from "../components/TaskForm";

function AddTask({ tasks, setTasks }) {
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  return (
    <div>
      <h2>Add Task</h2>
      <TaskForm onSubmit={addTask} />
    </div>
  );
}

export default AddTask;
import TaskList from "../components/TaskList";

function Tasks({ tasks, setTasks }) {
  return (
    <div className="container">
      <h2>📋 Task Dashboard</h2>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
}

export default Tasks;
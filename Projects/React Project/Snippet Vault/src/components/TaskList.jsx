import { Link } from "react-router-dom";

function TaskList({ tasks, setTasks }) {

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      {tasks.map(task => (
        <div key={task.id} className="card">
          <h3 style={{
            textDecoration: task.completed ? "line-through" : "none"
          }}>
            {task.title}
          </h3>

          <button className="btn-complete" onClick={() => toggleComplete(task.id)}>
            {task.completed ? "Undo" : "Complete"}
          </button>

          <button className="btn-delete" onClick={() => deleteTask(task.id)}>
            Delete
          </button>

          <Link to={`/edit-task/${task.id}`}>
            <button className="btn-edit">Edit</button>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
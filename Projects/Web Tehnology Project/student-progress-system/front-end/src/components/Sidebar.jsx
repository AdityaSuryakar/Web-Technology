import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>📘 Student App</h2>

      <Link to="/dashboard">Dashboard</Link>
      <Link to="/subjects">Subjects</Link>
      <Link to="/add-subject">Add Subject</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/history">History</Link>
      <Link to="/exam">Exams</Link>
    </div>
  );
}

export default Sidebar;
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link> | 
      <Link to="/subjects">Subjects</Link> | 
      <Link to="/progress">Progress</Link> | 
      <Link to="/history">History</Link> | 
      <Link to="/add-subject">Add Subject</Link> |
      <Link to="/exam">Exams</Link>
    </nav>
  );
}

export default Navbar;
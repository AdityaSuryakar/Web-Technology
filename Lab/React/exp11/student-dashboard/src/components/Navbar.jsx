import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav>
      {/* Link is used instead of <a> to prevent page reload */}
      <Link to="/">Home</Link> | 
      <Link to="/students">Students</Link> | 
      <Link to="/add">Add Student</Link>
    </nav>
  );
}

export default Navbar;

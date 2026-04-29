import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav>
      {/* Brand */}
      <Link to="/snippets" className="nav-brand">
        <span className="brand-icon">✦</span>
        SnippetVault
      </Link>

      {/* Links */}
      <div className="nav-links">
        <Link
          to="/snippets"
          className={pathname === "/snippets" ? "active" : ""}
        >
          📚 Library
        </Link>
        <Link
          to="/add-snippet"
          className={`nav-add-btn ${pathname === "/add-snippet" ? "active" : ""}`}
        >
          + New Snippet
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
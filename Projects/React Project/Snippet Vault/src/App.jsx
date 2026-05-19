import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Snippets     from "./pages/Snippets";
import AddSnippet   from "./pages/AddSnippet";
import EditSnippet  from "./pages/EditSnippet";
import ViewSnippet  from "./pages/ViewSnippet";
import Navbar       from "./components/Navbar";
import { useState, useEffect } from "react";
import { fetchSnippets } from "./api/snippetApi";
import "./App.css";

function App() {
  const [snippets, setSnippets]   = useState([]);
  const [loading,  setLoading]    = useState(true);
  const [dbError,  setDbError]    = useState(null);

  // Load snippets from MySQL on mount
  useEffect(() => {
    fetchSnippets()
      .then((data) => {
        setSnippets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setDbError("Cannot connect to the server. Make sure the backend is running on port 5000.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
        <p>Connecting to database…</p>
      </div>
    );
  }

  if (dbError) {
    return (
      <div className="app-loading">
        <div className="error-icon">⚠️</div>
        <p className="error-msg">{dbError}</p>
        <button className="btn-submit" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/"               element={<Navigate to="/snippets" replace />} />
        <Route path="/snippets"       element={<Snippets    snippets={snippets} setSnippets={setSnippets} />} />
        <Route path="/add-snippet"    element={<AddSnippet  setSnippets={setSnippets} />} />
        <Route path="/edit-snippet/:id" element={<EditSnippet snippets={snippets} setSnippets={setSnippets} />} />
        <Route path="/view-snippet/:id" element={<ViewSnippet snippets={snippets} setSnippets={setSnippets} />} />
      </Routes>
    </Router>
  );
}

export default App;
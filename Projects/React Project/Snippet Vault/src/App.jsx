import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Snippets from "./pages/Snippets";
import AddSnippet from "./pages/AddSnippet";
import EditSnippet from "./pages/EditSnippet";
import Navbar from "./components/Navbar";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [snippets, setSnippets] = useState([]);

  // Load from localStorage (same pattern as tasks)
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("snippets"));
    if (data) setSnippets(data);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("snippets", JSON.stringify(snippets));
  }, [snippets]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/snippets" replace />} />
        <Route path="/snippets" element={<Snippets snippets={snippets} setSnippets={setSnippets} />} />
        <Route path="/add-snippet" element={<AddSnippet snippets={snippets} setSnippets={setSnippets} />} />
        <Route path="/edit-snippet/:id" element={<EditSnippet snippets={snippets} setSnippets={setSnippets} />} />
      </Routes>
    </Router>
  );
}

export default App;
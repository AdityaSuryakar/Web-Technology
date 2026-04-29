import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import AddSubject from "./pages/AddSubject";
import Progress from "./pages/Progress";
import History from "./pages/History";
import Exam from "./pages/Exam";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <div className="main">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subjects" element={<Subjects />} />
            <Route path="/add-subject" element={<AddSubject />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/history" element={<History />} />
            <Route path="/exam" element={<Exam />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
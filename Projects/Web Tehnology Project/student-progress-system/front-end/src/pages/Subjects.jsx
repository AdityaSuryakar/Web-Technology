import { useEffect, useState } from "react";
import { getSubjects, deleteSubject } from "../services/subjectService";

function Subjects() {
  const [subjects, setSubjects] = useState([]);

  // Fetch subjects
  const fetchSubjects = async () => {
    try {
      const res = await getSubjects();
      setSubjects(res.data);
    } catch (err) {
      console.error("Error fetching subjects:", err);
    }
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // Delete subject
  const handleDelete = async (id) => {
    try {
      await deleteSubject(id);
      fetchSubjects(); // refresh list
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div>
      <div className="header">📚 Subjects</div>

      {/* If no subjects */}
      {subjects.length === 0 ? (
        <div className="card">
          <p>No subjects added yet</p>
        </div>
      ) : (
        <div className="grid">
          {subjects.map((subject) => (
            <div key={subject.id} className="card">
              <h3>{subject.name}</h3>

              <button
                className="btn-delete"
                onClick={() => handleDelete(subject.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Subjects;
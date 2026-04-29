import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addSubject } from "../services/subjectService";

function AddSubject() {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // ✅ MUST be inside component

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addSubject({ name });
      navigate("/subjects"); // redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="header">➕ Add Subject</div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter subject name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="btn-primary">Add</button>
      </form>
    </div>
  );
}

export default AddSubject;
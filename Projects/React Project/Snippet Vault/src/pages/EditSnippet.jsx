import { useParams, useNavigate } from "react-router-dom";
import SnippetForm from "../components/SnippetForm";

function EditSnippet({ snippets, setSnippets }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Same pattern as original EditTask
  const snippet = snippets.find(s => s.id === Number(id));

  const updateSnippet = (updated) => {
    setSnippets(snippets.map(s => s.id === updated.id ? updated : s));
    navigate("/snippets");
  };

  if (!snippet) {
    return (
      <div className="container">
        <p style={{ color: "var(--text-muted)", marginTop: 40 }}>
          Snippet not found. <a href="/snippets" style={{ color: "var(--accent-light)" }}>Go back</a>
        </p>
      </div>
    );
  }

  return (
    <div className="container form-page">
      <div className="form-card">
        <h2 className="form-title">✏️ Edit Snippet</h2>
        <SnippetForm onSubmit={updateSnippet} existingSnippet={snippet} />
      </div>
    </div>
  );
}

export default EditSnippet;

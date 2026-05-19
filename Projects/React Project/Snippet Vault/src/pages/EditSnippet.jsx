import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SnippetForm from "../components/SnippetForm";
import { updateSnippet } from "../api/snippetApi";

function EditSnippet({ snippets, setSnippets }) {
  const { id }   = useParams();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState(null);

  const snippet = snippets.find((s) => s.id === Number(id));

  const handleUpdate = async (snippetData) => {
    try {
      setSaving(true);
      setError(null);
      const updated = await updateSnippet(id, snippetData);
      setSnippets((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
      navigate("/snippets");
    } catch (err) {
      setError("Failed to update snippet. Please try again.");
      setSaving(false);
    }
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
        {error && <div className="form-error">⚠️ {error}</div>}
        <SnippetForm onSubmit={handleUpdate} existingSnippet={snippet} saving={saving} />
      </div>
    </div>
  );
}

export default EditSnippet;

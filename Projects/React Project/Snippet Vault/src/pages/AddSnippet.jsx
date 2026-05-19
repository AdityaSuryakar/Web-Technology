import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SnippetForm from "../components/SnippetForm";
import { createSnippet } from "../api/snippetApi";

function AddSnippet({ setSnippets }) {
  const [saving, setSaving]   = useState(false);
  const [error,  setError]    = useState(null);
  const navigate = useNavigate();

  const addSnippet = async (snippetData) => {
    try {
      setSaving(true);
      setError(null);
      const created = await createSnippet(snippetData);
      setSnippets((prev) => [created, ...prev]);
      navigate("/snippets");
    } catch (err) {
      setError("Failed to save snippet. Please try again.");
      setSaving(false);
    }
  };

  return (
    <div className="container form-page">
      <div className="form-card">
        <h2 className="form-title">✦ New Snippet</h2>
        {error && <div className="form-error">⚠️ {error}</div>}
        <SnippetForm onSubmit={addSnippet} saving={saving} />
      </div>
    </div>
  );
}

export default AddSnippet;

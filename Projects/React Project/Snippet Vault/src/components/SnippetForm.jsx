import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LANGUAGES = [
  { value: "javascript", label: "JavaScript", cls: "lang-js" },
  { value: "typescript", label: "TypeScript", cls: "lang-ts" },
  { value: "python",     label: "Python",     cls: "lang-py" },
  { value: "html",       label: "HTML",       cls: "lang-html" },
  { value: "css",        label: "CSS",        cls: "lang-css" },
  { value: "java",       label: "Java",       cls: "lang-java" },
  { value: "cpp",        label: "C++",        cls: "lang-cpp" },
  { value: "shell",      label: "Shell",      cls: "lang-shell" },
  { value: "json",       label: "JSON",       cls: "lang-json" },
  { value: "other",      label: "Other",      cls: "lang-other" },
];

function SnippetForm({ onSubmit, existingSnippet }) {
  const navigate = useNavigate();

  const [title,    setTitle]    = useState(existingSnippet?.title    || "");
  const [language, setLanguage] = useState(existingSnippet?.language || "javascript");
  const [code,     setCode]     = useState(existingSnippet?.code     || "");
  const [tagsRaw,  setTagsRaw]  = useState(
    existingSnippet?.tags ? existingSnippet.tags.join(", ") : ""
  );
  const [description, setDescription] = useState(existingSnippet?.description || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !code.trim()) return;

    const tags = tagsRaw
      .split(",")
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    const snippet = {
      id:          existingSnippet ? existingSnippet.id : Date.now(),
      title:       title.trim(),
      language,
      code,
      tags,
      description: description.trim(),
      createdAt:   existingSnippet?.createdAt || new Date().toISOString(),
    };

    onSubmit(snippet);
    navigate("/snippets");
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Title */}
      <div className="form-group">
        <label className="form-label">Snippet Title *</label>
        <input
          className="form-input"
          type="text"
          placeholder="e.g. Debounce function, Fetch with retry…"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Language + Description */}
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Language</label>
          <select
            className="form-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            {LANGUAGES.map(l => (
              <option key={l.value} value={l.value}>{l.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Description <span>(optional)</span></label>
          <input
            className="form-input"
            type="text"
            placeholder="Brief note about this snippet…"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
      </div>

      {/* Tags */}
      <div className="form-group">
        <label className="form-label">Tags <span>(comma-separated)</span></label>
        <input
          className="form-input"
          type="text"
          placeholder="react, hooks, async, utility…"
          value={tagsRaw}
          onChange={e => setTagsRaw(e.target.value)}
        />
        <div className="tags-hint">Separate multiple tags with commas</div>
      </div>

      {/* Code */}
      <div className="form-group">
        <label className="form-label">Code *</label>
        <textarea
          className="form-textarea"
          placeholder="Paste your code here…"
          value={code}
          onChange={e => setCode(e.target.value)}
          required
          spellCheck={false}
        />
      </div>

      {/* Actions */}
      <div className="form-actions">
        <button type="button" className="btn-cancel" onClick={() => navigate("/snippets")}>
          Cancel
        </button>
        <button type="submit" className="btn-submit">
          {existingSnippet ? "💾 Update Snippet" : "✦ Save Snippet"}
        </button>
      </div>
    </form>
  );
}

export { LANGUAGES };
export default SnippetForm;

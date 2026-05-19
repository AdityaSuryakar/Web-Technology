import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { LANGUAGES } from "../components/SnippetForm";
import { deleteSnippet } from "../api/snippetApi";

const langMeta = Object.fromEntries(
  LANGUAGES.map((l) => [l.value, { cls: l.cls, label: l.label }])
);

function ViewSnippet({ snippets, setSnippets }) {
  const { id }      = useParams();
  const navigate    = useNavigate();
  const codeRef     = useRef(null);
  const [copied, setCopied]   = useState(false);
  const [deleting, setDeleting] = useState(false);

  const snippet = snippets.find((s) => s.id === Number(id));
  const meta    = snippet
    ? langMeta[snippet.language] || { cls: "lang-other", label: snippet.language }
    : null;

  // Syntax-highlight whenever the snippet loads
  useEffect(() => {
    if (codeRef.current && snippet) {
      delete codeRef.current.dataset.highlighted;
      hljs.highlightElement(codeRef.current);
    }
  }, [snippet]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${snippet.title}"? This cannot be undone.`)) return;
    try {
      setDeleting(true);
      await deleteSnippet(snippet.id);
      setSnippets((prev) => prev.filter((s) => s.id !== snippet.id));
      navigate("/snippets");
    } catch {
      alert("Failed to delete snippet. Please try again.");
      setDeleting(false);
    }
  };

  if (!snippet) {
    return (
      <div className="container view-not-found">
        <div className="empty-icon">🔍</div>
        <div className="empty-title">Snippet not found</div>
        <div className="empty-subtitle">It may have been deleted or the ID is invalid.</div>
        <Link to="/snippets" className="empty-cta">← Back to Library</Link>
      </div>
    );
  }

  const createdDate = new Date(snippet.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "long", year: "numeric",
  });
  const createdTime = new Date(snippet.createdAt).toLocaleTimeString("en-IN", {
    hour: "2-digit", minute: "2-digit",
  });

  return (
    <div className="container view-page">

      {/* ── Back breadcrumb ───────────────────────────── */}
      <Link to="/snippets" className="view-back">
        ← Back to Library
      </Link>

      {/* ── Header ───────────────────────────────────── */}
      <div className="view-header">
        <div className="view-title-row">
          <h1 className="view-title">{snippet.title}</h1>
          <span className={`lang-badge ${meta.cls} lang-badge-lg`}>{meta.label}</span>
        </div>

        {snippet.description && (
          <p className="view-description">{snippet.description}</p>
        )}

        <div className="view-meta-row">
          <span className="view-meta-item">📅 {createdDate} · {createdTime}</span>
          {snippet.tags?.length > 0 && (
            <div className="view-tags">
              {snippet.tags.map((tag) => (
                <span key={tag} className="tag-pill">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Code Block ───────────────────────────────── */}
      <div className="view-code-card">
        <div className="view-code-toolbar">
          <span className="view-code-lang">{meta.label}</span>
          <div className="view-code-actions">
            <button
              className={`copy-btn-lg ${copied ? "copied" : ""}`}
              onClick={handleCopy}
            >
              {copied ? "✓ Copied!" : "⎘ Copy Code"}
            </button>
          </div>
        </div>

        <pre className="view-code-pre">
          <code ref={codeRef} className={`language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>
      </div>

      {/* ── Actions ──────────────────────────────────── */}
      <div className="view-actions">
        <Link to={`/edit-snippet/${snippet.id}`} className="btn-view-edit">
          ✏️ Edit Snippet
        </Link>
        <button
          className="btn-view-delete"
          onClick={handleDelete}
          disabled={deleting}
        >
          {deleting ? "⏳ Deleting…" : "🗑️ Delete Snippet"}
        </button>
      </div>
    </div>
  );
}

export default ViewSnippet;

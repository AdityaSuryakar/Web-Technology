import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";
import { LANGUAGES } from "./SnippetForm";

/* Map language value → CSS class & display label */
const langMeta = Object.fromEntries(
  LANGUAGES.map(l => [l.value, { cls: l.cls, label: l.label }])
);

function SnippetCard({ snippet, onDelete, onTagClick }) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [snippet.code]);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const meta = langMeta[snippet.language] || { cls: "lang-other", label: snippet.language };

  return (
    <div className="card">
      {/* Header */}
      <div className="card-header">
        <span className="card-title" title={snippet.title}>{snippet.title}</span>
        <span className={`lang-badge ${meta.cls}`}>{meta.label}</span>
      </div>

      {/* Code preview with copy button */}
      <div className="code-preview-wrapper">
        <pre className="code-preview">
          <code ref={codeRef} className={`language-${snippet.language}`}>
            {snippet.code}
          </code>
        </pre>

        <button
          className={`copy-btn ${copied ? "copied" : ""}`}
          onClick={handleCopy}
          title="Copy to clipboard"
        >
          {copied ? "✓ Copied" : "⎘ Copy"}
        </button>
      </div>

      {/* Footer: tags + actions */}
      <div className="card-footer">
        <div className="tags-row">
          {snippet.tags?.map(tag => (
            <span
              key={tag}
              className="tag-pill"
              onClick={() => onTagClick(tag)}
              title={`Filter by #${tag}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="card-actions">
          <Link to={`/edit-snippet/${snippet.id}`}>
            <button className="btn-edit">✏️ Edit</button>
          </Link>
          <button className="btn-delete" onClick={() => onDelete(snippet.id)}>
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default SnippetCard;

import { useState } from "react";
import { Link } from "react-router-dom";
import SnippetCard from "../components/SnippetCard";
import { LANGUAGES } from "../components/SnippetForm";

function Snippets({ snippets, setSnippets }) {
  const [search, setSearch]   = useState("");
  const [langFilter, setLang] = useState("all");
  const [tagFilter,  setTag]  = useState("");

  const handleDelete = (id) => {
    setSnippets(snippets.filter(s => s.id !== id));
  };

  const handleTagClick = (tag) => {
    setTag(prev => prev === tag ? "" : tag);
  };

  // Filter: search (title + description + tags) + language + active tag
  const filtered = snippets.filter(s => {
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      s.title.toLowerCase().includes(q) ||
      s.description?.toLowerCase().includes(q) ||
      s.tags?.some(t => t.includes(q)) ||
      s.code.toLowerCase().includes(q);

    const matchLang = langFilter === "all" || s.language === langFilter;
    const matchTag  = !tagFilter || s.tags?.includes(tagFilter);

    return matchSearch && matchLang && matchTag;
  });

  return (
    <div className="container">
      {/* Page Header */}
      <div className="page-header">
        <h2 className="page-title">
          📚 Snippet Library
          <span className="snippet-count">{filtered.length} snippet{filtered.length !== 1 ? "s" : ""}</span>
        </h2>

        {tagFilter && (
          <span className="tag-pill" onClick={() => setTag("")} style={{ cursor: "pointer" }}>
            🏷 #{tagFilter} ✕
          </span>
        )}
      </div>

      {/* Search + Language Filter */}
      <div className="search-filter-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search snippets by title, tag, or code…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <select
          className="lang-filter"
          value={langFilter}
          onChange={e => setLang(e.target.value)}
        >
          <option value="all">All Languages</option>
          {LANGUAGES.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>

      {/* Snippets Grid or Empty State */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✦</div>
          <div className="empty-title">
            {snippets.length === 0 ? "No snippets yet" : "No matches found"}
          </div>
          <div className="empty-subtitle">
            {snippets.length === 0
              ? "Save your first code snippet to get started"
              : "Try a different search term or clear filters"}
          </div>
          {snippets.length === 0 && (
            <Link to="/add-snippet" className="empty-cta">+ New Snippet</Link>
          )}
        </div>
      ) : (
        <div className="snippets-grid">
          {filtered.map(s => (
            <SnippetCard
              key={s.id}
              snippet={s}
              onDelete={handleDelete}
              onTagClick={handleTagClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Snippets;

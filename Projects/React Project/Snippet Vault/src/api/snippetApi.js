// Central API service — all MySQL calls go through here
const BASE_URL = "http://localhost:5000/api";

// ── Fetch all snippets ────────────────────────────────────────────────────────
export async function fetchSnippets() {
  const res = await fetch(`${BASE_URL}/snippets`);
  if (!res.ok) throw new Error("Failed to fetch snippets");
  return res.json();
}

// ── Fetch single snippet ──────────────────────────────────────────────────────
export async function fetchSnippet(id) {
  const res = await fetch(`${BASE_URL}/snippets/${id}`);
  if (!res.ok) throw new Error("Snippet not found");
  return res.json();
}

// ── Create snippet ────────────────────────────────────────────────────────────
export async function createSnippet(snippet) {
  const res = await fetch(`${BASE_URL}/snippets`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(snippet),
  });
  if (!res.ok) throw new Error("Failed to create snippet");
  return res.json();
}

// ── Update snippet ────────────────────────────────────────────────────────────
export async function updateSnippet(id, snippet) {
  const res = await fetch(`${BASE_URL}/snippets/${id}`, {
    method:  "PUT",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(snippet),
  });
  if (!res.ok) throw new Error("Failed to update snippet");
  return res.json();
}

// ── Delete snippet ────────────────────────────────────────────────────────────
export async function deleteSnippet(id) {
  const res = await fetch(`${BASE_URL}/snippets/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete snippet");
  return res.json();
}

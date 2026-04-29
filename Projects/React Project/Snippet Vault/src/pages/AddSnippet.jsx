import SnippetForm from "../components/SnippetForm";

function AddSnippet({ snippets, setSnippets }) {
  const addSnippet = (snippet) => {
    setSnippets([...snippets, snippet]);
  };

  return (
    <div className="container form-page">
      <div className="form-card">
        <h2 className="form-title">✦ New Snippet</h2>
        <SnippetForm onSubmit={addSnippet} />
      </div>
    </div>
  );
}

export default AddSnippet;

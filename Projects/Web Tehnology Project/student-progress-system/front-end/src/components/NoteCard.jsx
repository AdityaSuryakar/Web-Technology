function NoteCard({ note }) {
  return (
    <div>
      <h4>{note.title}</h4>
      <p>{note.content}</p>
    </div>
  );
}

export default NoteCard;
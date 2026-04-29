function SubjectCard({ subject, onDelete }) {
  return (
    <div>
      <h3>{subject.name}</h3>
      <button onClick={() => onDelete(subject.id)}>Delete</button>
    </div>
  );
}

export default SubjectCard;
function HistoryItem({ item }) {
  return (
    <div>
      <p>{item.note_title}</p>
      <small>{item.viewed_at}</small>
    </div>
  );
}

export default HistoryItem;
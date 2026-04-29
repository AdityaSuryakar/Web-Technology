function ProgressBar({ percent }) {
  return (
    <div style={{ width: "100%", background: "#ddd" }}>
      <div
        style={{
          width: `${percent}%`,
          background: "green",
          color: "white"
        }}
      >
        {percent}%
      </div>
    </div>
  );
}

export default ProgressBar;
import ProgressBar from "../components/ProgressBar";

function Progress() {
  return (
    <div>
  <div className="header">📊 Progress</div>

  <div className="card">
    <p>Math</p>
    <div style={{ background: "#ddd" }}>
      <div style={{ width: "60%", background: "green", color: "white" }}>
        60%
      </div>
    </div>
  </div>
</div>
  );
}
export default Progress;
import Student from "./Student";

function App() {
  // Simple event function
  const showMessage = () => {
    alert("Button Clicked!");
  };

  return (
    <>
      <h1>Student info</h1>
      <button onClick={showMessage}>
        Click Me
      </button>
      <Student name="Sanika" age="20" course="AIML" />
       <Student name="Pranali" age="20" course="IT" />
        <Student name="Prachi" age="20" course="Diploma" />
    </>
  )
}
export default App;

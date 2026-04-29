const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/subjects", require("./routes/subjectRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));

app.listen(5000, () => {
  console.log("Server running on port http://localhost:5000");
});
import API from "./api";

export const getExams = () => API.get("/exams");
export const addExam = (data) => API.post("/exams", data);
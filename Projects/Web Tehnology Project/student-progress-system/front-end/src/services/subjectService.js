import API from "./api";

export const getSubjects = () => API.get("/subjects");
export const addSubject = (data) => API.post("/subjects", data);
export const deleteSubject = (id) => API.delete(`/subjects/${id}`);
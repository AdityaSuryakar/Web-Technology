import API from "./api";

export const getNotes = (subjectId) => API.get(`/notes/${subjectId}`);
export const addNote = (data) => API.post("/notes", data);
// •	Display students using map()
// •	Show message if list is empty

function StudentList({ students }) {
    return (
        <div>
            <h2>Student List</h2>
            {students.length === 0 ? (
                <p>No students added yet.</p>
            ) : (
                <ul>
                    {students.map((student, index) => (
                        <li key={index}>{student.name} - Age: {student.age}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default StudentList;
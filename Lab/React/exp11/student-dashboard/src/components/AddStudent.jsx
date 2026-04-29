// •	Take input from user
// •	Validate input
// •	Add student to list
// •	Show alert message
import React, { useState } from 'react';

function AddStudent({ students, setStudents }) {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || age.trim() === '') {
            alert('Please enter both name and age.');
            return;
        }
        const newStudent = { name, age };
        setStudents([...students, newStudent]);
        setName('');
        setAge('');
        alert('Student added successfully!');
    };
    return (
        <div>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="age">Age:</label>
                    <input
                        type="number"
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>
                <button type="submit">Add Student</button>
            </form>
        </div>
    );
}

export default AddStudent;
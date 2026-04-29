// var students = [
//     {
//         name: "Aditya",
//         age: 20,
//         grade: "A"
//     },
//     {
//         name: "Sattu",
//         age: 22,        
//         grade: "B"
//     },
//     {
//         name: "Amu",
//         age: 21,
//         grade: "C"
//     }
// ];
//accessing object properties
// console.log(students[0].name); // John
// console.log(students[1].age); // 22
// console.log(students[2].grade); // C
// //looping through array of objects
// for (var i = 0; i < students.length; i++) {
//     console.log(students[i].name + " is " + students[i].age + " years old and has grade " + students[i].grade);
// }


// Create array of objects using Express

const express = require('express');   // Import express module
const app = express();                // Create express app
const port = 3000;                    // Server port

// Array of student objects
const students = [
    {
        name: "Aditya",
        age: 20,
        email: "aditya@example.com"
    },
    {
        name: "Sattu",
        age: 22,
        email: "sattu@example.com"
    },
    {
        name: "Amu",
        age: 21,
        email: "amu@example.com"
    }
];

// Route to get all students
app.get('/students', (req, res) => {
    res.json(students);   // Send students data in JSON format
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

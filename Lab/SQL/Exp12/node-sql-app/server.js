const express = require ('express');
const mysql = require ('mysql2');
const bodyParser = require ('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'manager',
    database: 'studentdb'
});
db.connect((err) => {
    if(err) {
        console.error('database connection failed:', err);
    }else{
        console.log('connected to MySQL');
    }
});

app.post('/students', (req, res) => {
    const { name, age ,course } = req.body;
    const query = 'INSERT INTO students (name, age, course) VALUES (?, ?, ?)';

    db.query(query, [name, age, course], (err, result) => {
        if(err) {
            res.send(err);
        }else{
            res.send('Student added successfully');
        }
    });
});
app.get('/students', (req, res) => {
    db.query('SELECT * FROM students', (err, results) => {
        if(err) {
            res.send(err);
        }else{
            res.json(results);
        }
    });
});
app.put('/students/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, course } = req.body;
    const sql = 'UPDATE students SET name = ?, age = ?, course = ? WHERE id = ?';
    db.query(sql, [name, age, course, id], (err, result) => {
        if(err) {
            res.send(err);
        }else{
            res.send('Student updated successfully');
        }
    });
});
app.delete('/students/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM students WHERE id = ?';
    db.query(sql, [id], (err, result) => {
        if(err) {
            res.send(err);
        }else{
            res.send('Student deleted successfully');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
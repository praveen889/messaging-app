const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Praveen#1',
    database: 'messaging_app'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// Register
app.post('/register', (req, res) => {
    const { name, email, phone_number, role, password } = req.body; // Include password in the request body
    const query = `INSERT INTO users (name, email, phone_number, role, password) VALUES (?, ?, ?, ?, ?)`;
    
    db.query(query, [name, email, phone_number, role, password], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, name, email, phone_number, role });
    });
});


// Login
app.post('/login', (req, res) => {
    const { email, password } = req.body; // Extract email and password from the request body
    const query = `SELECT * FROM users WHERE email = ?`;
    
    db.query(query, [email], (err, result) => {
        if (err) throw err;
        if (result.length) {
            const user = result[0];
            if (user.password === password) { // Check if the provided password matches the stored password
                res.send(user); // Send user data upon successful login
            } else {
                res.status(401).send({ message: 'Invalid password' }); // Send error if the password is incorrect
            }
        } else {
            res.status(404).send({ message: 'User not found' }); // Send error if the user is not found
        }
    });
});


// CRUD Operations for Users
app.get('/users', (req, res) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send(result[0]);
    });
});


// Update user details
app.put('/users/:id', (req, res) => {
    const { name, phone_number, role } = req.body;
    const { id } = req.params;
    const query = `UPDATE users SET name = ?, phone_number = ?, role = ? WHERE id = ?`;
    db.query(query, [name, phone_number, role, id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Profile updated successfully' });
    });
});

// Delete user account
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Account deleted successfully' });
    });
});

// Send a message
app.post('/messages', (req, res) => {
    const { senderId, receiverId, message } = req.body;
    const query = `INSERT INTO messages (sender_id, receiver_id, message) VALUES (?, ?, ?)`;
    db.query(query, [senderId, receiverId, message], (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, senderId, receiverId, message });
    });
});

app.get('/messages/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ?`;
    db.query(query, [userId, userId], (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});




// Get conversation history between two users
app.get('/messages/:senderId/:receiverId', (req, res) => {
    const { senderId, receiverId } = req.params;
    const query = `SELECT * FROM messages WHERE 
        (sender_id = ? AND receiver_id = ?) OR 
        (sender_id = ? AND receiver_id = ?)
        ORDER BY timestamp`;
    db.query(query, [senderId, receiverId, receiverId, senderId], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

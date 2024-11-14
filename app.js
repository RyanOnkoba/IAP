const express = require('express');
const mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,  // Change if your MySQL server is hosted elsewhere
    user: 'root',            // Your MySQL username
    password: '1a2bacadaeE101', // Your MySQL password
    database: 'recipes'    // Your database name
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Define a route to add a new recipe
app.post('/add-recipe', (req, res) => {
    const { name, ingredients, instructions } = req.body;

    // Basic input validation
    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Name, ingredients, and instructions are required' });
    }

    // Insert recipe into the database
    const query = 'INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)';
    db.query(query, [name, ingredients, instructions], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding recipe: ' + err.message });
        }
        res.json({ message: 'Recipe added successfully' });
    });
});

// Other routes...

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

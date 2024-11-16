const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./dbConnection'); // Import the database connection

dotenv.config(); // Load environment variables from a `.env` file

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Example query to ensure the database connection works
db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Error executing query:', err.message);
    } else {
        console.log('Database connection test successful. Solution:', results[0].solution);
    }
});

// Define a route to add a new recipe
app.post('/add-recipe', (req, res) => {
    const { name, ingredients, instructions } = req.body;

    // Validate inputs
    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Name, ingredients, and instructions are required.' });
    }

    // Insert recipe into the database
    const query = 'INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)';
    db.query(query, [name, ingredients, instructions], (err, results) => {
        if (err) {
            console.error('Error adding recipe:', err.message);
            return res.status(500).json({ message: 'Error adding recipe: ' + err.message });
        }
        res.status(201).json({ message: 'Recipe added successfully', recipeId: results.insertId });
    });
});

// Define a route to fetch all recipes
app.get('/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err.message);
            return res.status(500).json({ message: 'Error fetching recipes: ' + err.message });
        }
        res.status(200).json(results);
    });
});

// Handle invalid routes
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

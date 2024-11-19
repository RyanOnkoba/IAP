const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const path = require('path');
dotenv.config(); // Load environment variables from a `.env` file

// Database connection using mysql2
const db = mysql.createConnection({
    host: 'localhost',    // Your database host
    user: 'root',         // Your database username
    password: '1a2bacadae@E101',         // Your database password
    database: 'recipes' // Your database name
});

// Test the database connection
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
    }
    console.log('Connected to the database');
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads

// Serve static files directly from the root directory (without the 'public' folder)
app.use(express.static(path.join(__dirname)));

// Route to serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'homepage.html')); // No 'public' part
});

// Adding a recipe
app.post('/add-recipe', (req, res) => {
    const { name, ingredients, instructions } = req.body;

    if (!name || !ingredients || !instructions) {
        return res.status(400).json({ message: 'Name, ingredients, and instructions are required.' });
    }

    const query = 'INSERT INTO recipes (name, ingredients, instructions) VALUES (?, ?, ?)';
    db.query(query, [name, ingredients, instructions], (err, results) => {
        if (err) {
            console.error('Error adding recipe:', err.message);
            return res.status(500).json({ message: 'Error adding recipe' });
        }
        res.status(201).json({ message: 'Recipe added successfully', recipeId: results.insertId });
    });
});

// Fetching all recipes
app.get('/recipes', (req, res) => {
    const query = 'SELECT * FROM recipes';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching recipes:', err.message);
            return res.status(500).json({ message: 'Error fetching recipes' });
        }
        res.status(200).json(results);
    });
});

// Search route
app.get('/search', (req, res) => {
    const query = req.query.q.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(query) ||
        recipe.description.toLowerCase().includes(query)
    );
    res.json(filteredRecipes);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
});

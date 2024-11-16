const express = require('express');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables from a `.env` file

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./dbConnection');

// Example query to test the connection
db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
        console.error('Error executing query:', err.message);
        return;
    }
    console.log('The solution is:', results[0].solution);
});


const db = require('./dbConnection');

// Test connection
async function testConnection() {
    try {
        const [rows] = await db.query('SELECT 1 + 1 AS solution');
        console.log('Database connected! Test query result:', rows[0].solution);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

testConnection();

async function getUsers() {
    try {
        const [users] = await db.query('SELECT * FROM Users');
        console.log(users);
    } catch (err) {
        console.error('Error fetching users:', err);
    }
}

getUsers();

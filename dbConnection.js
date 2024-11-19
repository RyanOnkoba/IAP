const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables from a `.env` file

// Create a MySQL connection pool
const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '1a2bacadae@E101',
    database: process.env.DB_NAME || 'recipes',
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = db; // Export the connection pool

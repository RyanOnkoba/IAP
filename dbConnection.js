const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localmySQL',
    user: 'root',       // Replace with your MySQL username
    password: '1a2bacadaeE101',   // Replace with your MySQL password
    database: 'flavourvault',     // Replace with your database name
    port: 3306                   // Default MySQL port
});

// Export the pool for use in your application
module.exports = pool.promise();

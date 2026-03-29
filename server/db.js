'use strict';

const { Pool } = require('pg');

// Create a pool for PostgreSQL database connection
const pool = new Pool({
    user: 'your_username', // replace with your database username
    host: 'localhost',
    database: 'your_database', // replace with your database name
    password: 'your_password', // replace with your password
    port: 5432,
});

// Export the pool to be used in other parts of the application
module.exports = pool;

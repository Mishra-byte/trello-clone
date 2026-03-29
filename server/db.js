const { Pool } = require('pg'); // ✅ THIS LINE WAS MISSING

const pool = new Pool({
  user: 'postgres',
  host: '/var/run/postgresql', // socket (no password issue)
  database: 'trello_clone',
  port: 5432,
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch(err => console.error('❌ DB Connection Error:', err));

module.exports = pool;

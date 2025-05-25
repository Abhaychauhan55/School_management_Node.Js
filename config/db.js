const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306, // optional but good
  connectTimeout: 10000              // handle long connection wait
});

connection.connect(err => {
  if (err) {
    console.error('❌ Failed to connect to MySQL:', err);
    return;
  }
  console.log('✅ Connected to MySQL database.');
});

module.exports = connection;


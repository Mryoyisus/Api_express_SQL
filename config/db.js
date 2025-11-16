require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const mysql = require('mysql2');

console.log('Variables de entorno:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASS:', process.env.DB_PASS ? '[OCULTO]' : '(vacío)');
console.log('DB_NAME:', process.env.DB_NAME);

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'api_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Error conectando a MySQL:', err.message);
    return;
  }
  console.log('Conectado a MySQL');
});

module.exports = connection;
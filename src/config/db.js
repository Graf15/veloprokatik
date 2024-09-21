const mysql = require('mysql2');
require('dotenv').config();  // Загружаем переменные окружения из файла .env

// Создаем подключение к базе данных
const connection = mysql.createConnection({
  host: process.env.DB_HOST,        // Читаем из переменной окружения
  user: process.env.DB_USER,        // Читаем из переменной окружения
  password: process.env.DB_PASSWORD || '',  // Если переменная пустая, передаем пустую строку,  // Читаем из переменной окружения
  database: process.env.DB_NAME,    // Читаем из переменной окружения
  port: process.env.DB_PORT || 3306 // Читаем из переменной окружения или используем порт по умолчанию
});

// Подключаемся к базе данных
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
  console.log('Connected to the MySQL database!');
});

module.exports = connection;
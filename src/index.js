
const express = require('express');
require('dotenv').config();  // Загружает переменные из .env
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
require('./config/db'); // Подключаем базу данных

const app = express();
const PORT = process.env.PORT;
console.log(PORT, process.env.PORT, process.env.DB_USER)

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Маршруты
app.use('/api', apiRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

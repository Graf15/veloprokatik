const db = require('../config/db'); // Подключение к базе данных

// Функция для добавления велосипеда
const addBike = (req, res) => {
  const { name, typeId } = req.body;
  if (!name || !typeId) {
    console.log("Ошибка в имени или типе");
    return res.status(400).json({ message: 'Bike name and type are required' });
  }

  const query = 'INSERT INTO bikes (model, bike_type_id) VALUES (?, ?)';
  db.query(query, [name, typeId], (error, results) => {
    if (error) {
      console.log("Ошибка в байк контроллере", error);
      return res.status(500).json({ message: 'Error adding bike', error });
    }
    res.status(201).json({ message: 'Bike added successfully', bikeId: results.insertId });
  });
};

// Функция для получения типов велосипеда
const getBikeTypes = (req, res) => {
  db.query('SELECT * FROM bike_types', (error, results) => {
    if (error) {
      console.log("Ошибка получения типов велосипедов", error);
      return res.status(500).json({ message: 'Error fetching bike types', error });
    }
    res.status(200).json(results);
  });
};

const getBikeBrands = (req, res) => {
  db.query('SELECT * FROM brands WHERE product_type LIKE "%bike%"', (error, results) => {
      if (error) {
          return res.status(500).json({ message: 'Error fetching brands', error });
      }
      res.status(200).json(results);
  });
};

// Получение всех велосипедов
const getAllBikes = (req, res) => {
  const query = 'SELECT * FROM bikes';
  db.query(query, (error, results) => {
    if (error) {
      console.log('Ошибка при получении данных log')
      return res.status(500).json({ message: 'Ошибка при получении данных', error });
    }
    res.status(200).json(results);
  });
};

// Обновление данных велосипеда
const updateBike = (req, res) => {
  const bikeId = req.params.id;
  const updates = req.body;

  // Проверка наличия обновлений
  if (!updates || Object.keys(updates).length === 0) {
    console.error('Ошибка: Неверные данные для обновления');
    return res.status(400).json({ message: 'Неверные данные для обновления' });
  }

  // Формирование SQL-запроса
  const fields = Object.keys(updates).map(field => `${field} = ?`).join(', ');
  const values = Object.values(updates);

  const query = `UPDATE bikes SET ${fields} WHERE id = ?`;
  console.log('SQL-запрос:', query);
  console.log('Параметры:', [...values, bikeId]);

  db.query(query, [...values, bikeId], (error, results) => {
    if (error) {
      console.error('Ошибка при выполнении SQL-запроса:', error);
      return res.status(500).json({ message: 'Ошибка при обновлении данных', error });
    }
    res.status(200).json({ message: 'Данные успешно обновлены' });
  });
};

module.exports = { addBike, getBikeTypes, getBikeBrands, getAllBikes, updateBike };


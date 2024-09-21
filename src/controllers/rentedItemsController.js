const db = require('../config/db'); // Подключение к базе данных

// Получить все арендованные предметы
exports.getAllRentedItems = (req, res) => {
  db.query('SELECT * FROM rented_items', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выполнении запроса' });
    }
    res.json(results);
  });
};

// Получить арендованный предмет по ID
exports.getRentedItemById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM rented_items WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выполнении запроса' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Арендованный предмет не найден' });
    }
    res.json(results[0]);
  });
};

// Создать новый арендованный предмет
exports.createRentedItem = (req, res) => {
  const { rental_contract_id, bike_id, start_time, end_time, amount } = req.body;
  const sql = 'INSERT INTO rented_items (rental_contract_id, bike_id, start_time, end_time, amount) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [rental_contract_id, bike_id, start_time, end_time, amount], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при создании арендованного предмета' });
    }
    res.status(201).json({ id: results.insertId, rental_contract_id, bike_id, start_time, end_time, amount });
  });
};

// Обновить арендованный предмет по ID
exports.updateRentedItem = (req, res) => {
  const { id } = req.params;
  const { rental_contract_id, bike_id, start_time, end_time, amount } = req.body;
  const sql = 'UPDATE rented_items SET rental_contract_id = ?, bike_id = ?, start_time = ?, end_time = ?, amount = ? WHERE id = ?';
  db.query(sql, [rental_contract_id, bike_id, start_time, end_time, amount, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при обновлении арендованного предмета' });
    }
    res.json({ id, rental_contract_id, bike_id, start_time, end_time, amount });
  });
};

// Удалить арендованный предмет по ID
exports.deleteRentedItem = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM rented_items WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при удалении арендованного предмета' });
    }
    res.status(204).end();
  });
};
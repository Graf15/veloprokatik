
const db = require('../config/db'); // Подключение к базе данных

// Получить все договора аренды
exports.getAllRentalContracts = (req, res) => {
  db.query('SELECT * FROM rental_contracts', (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выполнении запроса' });
    }
    res.json(results);
  });
};

// Получить договор аренды по ID
exports.getRentalContractById = (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM rental_contracts WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при выполнении запроса' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Договор аренды не найден' });
    }
    res.json(results[0]);
  });
};

// Создать новый договор аренды
exports.createRentalContract = (req, res) => {
  const { start_time, end_time, client_id, total_rental_time, total_amount, status } = req.body;
  const sql = 'INSERT INTO rental_contracts (start_time, end_time, client_id, total_rental_time, total_amount, status) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(sql, [start_time, end_time, client_id, total_rental_time, total_amount, status], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при создании договора аренды' });
    }
    res.status(201).json({ id: results.insertId, start_time, end_time, client_id, total_rental_time, total_amount, status });
  });
};

// Обновить договор аренды по ID
exports.updateRentalContract = (req, res) => {
  const { id } = req.params;
  const { start_time, end_time, client_id, total_rental_time, total_amount, status } = req.body;
  const sql = 'UPDATE rental_contracts SET start_time = ?, end_time = ?, client_id = ?, total_rental_time = ?, total_amount = ?, status = ? WHERE id = ?';
  db.query(sql, [start_time, end_time, client_id, total_rental_time, total_amount, status, id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при обновлении договора аренды' });
    }
    res.json({ id, start_time, end_time, client_id, total_rental_time, total_amount, status });
  });
};

// Удалить договор аренды по ID
exports.deleteRentalContract = (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM rental_contracts WHERE id = ?', [id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка при удалении договора аренды' });
    }
    res.status(204).end();
  });
};
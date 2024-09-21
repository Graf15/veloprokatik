// G:\mega\я умамки програмист\veloprokatik\src\controllers\loginController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Импорт базы данных

const login = async (req, res) => {
  const { username, password } = req.body;

  

  // Проверяем, переданы ли username и password
  if (!username || !password) {
    return res.status(400).json({ message: 'Необходимо ввести логин и пароль.' });
  }

  // Поиск пользователя в базе данных
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка сервера.' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Пользователь не найден.' });
    }

    const user = results[0];
    console.log(user, password)

    // Проверка пароля
    try {
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(isMatch)

      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный пароль.' });
      }

      // Логика генерации JWT токена и авторизации
      const token = jwt.sign(
        { userId: user.id, username: user.username, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );

       // Отправляем токен в куки
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 3600000 }); // 1 час

      res.json({ message: 'Успешная авторизация.', token });
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при проверке пароля.' });
    }
  });
};

module.exports = { login };
const bcrypt = require('bcryptjs');

// Пароль, который вы хотите захешировать
const password = 'gPE9gu^Pp^zo.s@';

// Генерация соли и хэширование пароля
bcrypt.genSalt(10, (err, salt) => {
  if (err) throw err;

  bcrypt.hash(password, salt, (err, hashedPassword) => {
    if (err) throw err;

    console.log(`Хешированный пароль: ${hashedPassword}`);
  });
});
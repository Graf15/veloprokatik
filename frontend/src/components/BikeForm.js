
import React, { useState, useEffect } from 'react';

const BikeForm = () => {
  const [name, setName] = useState('');
  const [typeId, setTypeId] = useState('');
  const [bikeTypes, setBikeTypes] = useState([]);
  const [brandId, setBrandId] = useState('');
  const [brands, setBrands] = useState([]); 


  

  useEffect(() => {
    // Загружаем типы велосипедов
    fetch('/api/bike-types')
      .then(response => response.json())
      .then(data => setBikeTypes(data))
      .catch(error => console.error('Ошибка при загрузке типов велосипедов:', error));

    // Загружаем бренды
    fetch('/api/bike-brands')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Ошибка при загрузке брендов:', error));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('/api/bikes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, typeId }),
    })
    .then(response => response.json())
    .then(data => console.log('Успех:', data))
    .catch(error => console.error('Ошибка при отправке данных:', error));
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Название:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        Тип:
        <select value={typeId} onChange={(e) => setTypeId(e.target.value)} required>
          <option value="">Выберите тип</option>
          {bikeTypes.map(type => (
            <option key={type.id} value={type.id}>{type.name}</option>
          ))}
        </select>
      </label>
      <label>
        Бренд:
        <select value={brandId} onChange={(e) => setBrandId(e.target.value)} required>
          <option value="">Выберите бренд</option>
          {brands.map(brand => (
            <option key={brand.id} value={brand.id}>{brand.name}</option>
          ))}
        </select>
      </label>
      <button type="submit">Добавить велосипед</button>
    </form>
  );
};

export default BikeForm;
import React, { useState, useEffect } from 'react';

const BikesTable = () => {
  const [bikes, setBikes] = useState([]);
  const [editMode, setEditMode] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/bikes')
      .then(response => response.json())
      .then(data => setBikes(data))
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  const handleEditClick = (id) => {
    setEditMode({ [id]: true });
  };

  const handleSaveClick = (id) => {
    const bikeToUpdate = bikes.find(bike => bike.id === id);
    delete bikeToUpdate.created_at;
  
    console.log('Перед сохранением:', bikeToUpdate);
  
    fetch(`/api/bikes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bikeToUpdate),
    })
    .then(response => {
      if (response.ok) {
        setMessage('Данные успешно обновлены');
        setEditMode({});
        return response.json();
      } else {
        return response.json().then(errorData => {
          throw new Error(errorData.message || 'Ошибка при обновлении данных');
        });
      }
    })
    .catch(error => {
      console.error('Ошибка при обновлении данных:', error);
      setMessage('Ошибка при обновлении данных: ' + error.message);
    });
  };

  const handleCancelClick = (id) => {
    setEditMode({});
  };

  const handleInputChange = (id, field, value) => {
    setBikes(prevBikes =>
      prevBikes.map(bike =>
        bike.id === id ? { ...bike, [field]: value } : bike
      )
    );
    setEditMode(prevMode => ({
      ...prevMode,
      [id]: { ...prevMode[id], [field]: value }
    }));
  };

  return (
    <div>
      {message && <div>{message}</div>}
      <table>
        <thead>
          <tr>
            <th>Название</th>
            <th>Номер на наклейке</th>
            <th>Цена</th>
            <th>Размер</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map(bike => (
            <tr key={bike.id}>
              <td>
                {editMode[bike.id] ? (
                  <input
                    type="text"
                    value={bike.model}
                    onChange={(e) => handleInputChange(bike.id, 'model', e.target.value)}
                  />
                ) : (
                  bike.model
                )}
              </td>
              <td>
                {editMode[bike.id] ? (
                  <input
                    type="text"
                    value={bike.number_sticker || ''}
                    onChange={(e) => handleInputChange(bike.id, 'number_sticker', e.target.value)}
                  />
                ) : (
                  bike.number_sticker
                )}
              </td>
              <td>
                {editMode[bike.id] ? (
                  <input
                    type="number"
                    value={bike.price_site_UAH || ''}
                    onChange={(e) => handleInputChange(bike.id, 'price_site_UAH', e.target.value)}
                  />
                ) : (
                  bike.price_site_UAH
                )}
              </td>
              <td>
                {editMode[bike.id] ? (
                  <input
                    type="text"
                    value={bike.size || ''}
                    onChange={(e) => handleInputChange(bike.id, 'size', e.target.value)}
                  />
                ) : (
                  bike.size
                )}
              </td>
              <td>
                {editMode[bike.id] ? (
                  <>
                    <button onClick={() => handleSaveClick(bike.id)}>Сохранить</button>
                    <button onClick={() => handleCancelClick(bike.id)}>Отменить</button>
                  </>
                ) : (
                  <button onClick={() => handleEditClick(bike.id)}>Редактировать</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BikesTable;
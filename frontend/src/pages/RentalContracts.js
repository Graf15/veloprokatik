import React, { useState, useEffect } from 'react';

const RentalContracts = () => {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    // TODO: Добавить логику для получения данных с сервера
  }, []);

  return (
    <div>
      <h1>Rental Contracts</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Client ID</th>
            <th>Total Rental Time</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contracts.map(contract => (
            <tr key={contract.id}>
              <td>{contract.id}</td>
              <td>{contract.start_time}</td>
              <td>{contract.end_time}</td>
              <td>{contract.client_id}</td>
              <td>{contract.total_rental_time}</td>
              <td>{contract.total_amount}</td>
              <td>{contract.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalContracts;
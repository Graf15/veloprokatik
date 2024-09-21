// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Пример получения данных пользователя из контекста или локального хранилища
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log(token)

  return token;
};

// Пример приватного маршрута
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/pidr" />;  // Перенаправление на страницу логина
  }
  return children;
};

export default ProtectedRoute;
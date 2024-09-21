import { Navigate } from 'react-router-dom';
import { isAdmin } from './auth';

const AdminRoute = ({ children }) => {
  return isAdmin() ? children : <Navigate to="/login" />;
};

export default AdminRoute;
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuth = !!localStorage.getItem('token'); // simulate login check
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

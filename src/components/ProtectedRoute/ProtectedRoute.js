import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isLoggedIn === false) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn]);

  return isLoggedIn ? element : null;
};

export default ProtectedRoute;

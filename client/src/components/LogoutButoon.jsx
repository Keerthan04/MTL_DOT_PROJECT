// LogoutButton.js

import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();  // Use the logout function from context

  const handleLogout = () => {
    logout();  // Clear the token from context
    navigate('/');  // Redirect to the login page
  };

  return (
    <button onClick={handleLogout} className="btn btn-primary">
      Logout
    </button>
  );
};

export default LogoutButton;

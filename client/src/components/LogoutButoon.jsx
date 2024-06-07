// LogoutButton.js
import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LogoutButton = ({islarge}) => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // Use the logout function from context

  const handleLogout = () => {
    logout(); // Clear the token from context
    navigate("/"); // Redirect to the login page
  };

  return (
    <Button onClick={handleLogout} size={islarge ? "lg" : "md"} color="danger" href="#" variant="solid">
      Log out
    </Button>
    // <Button onClick={handleLogout} size="lg" color="danger" href="#" variant="solid">
    //   Log out
    
  );
};

export default LogoutButton;

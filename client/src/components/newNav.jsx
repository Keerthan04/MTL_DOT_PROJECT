import { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import { useNavigate } from 'react-router-dom';
// import LogoutButton from "./LogoutButoon"; 
import Logo from '../images/tmg-logo.jpg'; 
import Popup from './Popup';
import "./newNav.css";
import { useAuth } from "./AuthContext";

function NewNav({ token, username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const { logout } = useAuth(); 
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    
    
    setShowLogoutPopup(false);
    
    // Use the logout function from context
    
    
    setPopupMessage("You have been logged out successfully.");
    setShowPopup(true);
    setTimeout(()=>{
      logout(); // Clear the token from context
      navigate("/"); // Redirect to the login page
      setShowPopup(false);
    },1000);
    
    // Add your actual logout logic here, e.g., removing token, calling logout function from context
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage(null);
  };

  const handleNavigation = (path) => {
    navigate(path, { state: { username, token } });
  };

  return (
    <div className="w-full">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isBordered
        isBlurred={false}
        maxWidth="full"
      >
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand className="flex items-center">
            <div className="flex items-center gap-2">
              <img src={Logo} alt="Logo" className="w-8 h-8" />
              <h2 className="flex items-center text-lg font-bold">
                <span id="dot" className="text-primary">DOT</span>
                <span id="mmnl">-MTL</span>
              </h2>
            </div>
            <div className="mx-4 border-l border-black h-8"></div>
            <div className="hidden sm:block">
              <h4>Hello, <span className="user">{username}</span></h4>
            </div>
          </NavbarBrand>
        </NavbarContent>
        <NavbarContent className="hidden md:flex gap-20" justify="center">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" color="primary" size="lg" className="text-black">
                  Entry
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" onClick={() => handleNavigation("/home/entry/Scheduling")}>
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" onClick={() => handleNavigation("/home/entry/CTP")}>
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" onClick={() => handleNavigation("/home/entry/Editorial")}>
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" onClick={() => handleNavigation("/home/entry/Prepress")}>
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" onClick={() => handleNavigation("/home/entry/Machinestop")}>
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" onClick={() => handleNavigation("/home/entry/Production")}>
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem isActive>
            <Link className="HOME" color="foreground" onClick={() => handleNavigation("/home")}>
              HOME
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" color="primary" size="lg" className="text-black">
                  Report
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" onClick={() => handleNavigation("/home/report/Scheduling")}>
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" onClick={() => handleNavigation("/home/report/CTP")}>
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" onClick={() => handleNavigation("/home/report/Editorial")}>
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" onClick={() => handleNavigation("/home/report/Prepress")}>
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" onClick={() => handleNavigation("/home/report/Machinestop")}>
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" onClick={() => handleNavigation("/home/report/Production")}>
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        {!isMenuOpen && (
          <NavbarContent className="hidden sm:flex" justify="end">
            <NavbarItem>
            <Button onClick={handleLogout} size={ "lg"} color="danger" href="#" variant="solid">
              Log out
            </Button>
            </NavbarItem>
          </NavbarContent>
        )}
        <NavbarMenu>
          <NavbarMenuItem>
            <Button
              variant="light"
              color="primary"
              className="text-black text-lg"
            >
              Hello, <span className="user">{username}</span>
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Dropdown>
              <NavbarMenuItem>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    color="primary"
                    className="text-black text-md"
                  >
                    Entry
                  </Button>
                </DropdownTrigger>
              </NavbarMenuItem>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" onClick={() => handleNavigation("/home/entry/Scheduling")}>
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" onClick={() => handleNavigation("/home/entry/CTP")}>
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" onClick={() => handleNavigation("/home/entry/Editorial")}>
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" onClick={() => handleNavigation("/home/entry/Prepress")}>
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" onClick={() => handleNavigation("/home/entry/Machinestop")}>
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" onClick={() => handleNavigation("/home/entry/Production")}>
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarMenuItem>
          <NavbarMenuItem>
            {/* <Button color="primary" variant="light"> */}
              <Link
                color="foreground"
                onClick={() => handleNavigation("/home")}
                className="w-full flex text-center justify-center text-md"
              >
                HOME
              </Link>
            {/* </Button> */}
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Dropdown>
              <NavbarMenuItem>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    color="primary"
                    className="text-black text-md"
                  >
                    Report
                  </Button>
                </DropdownTrigger>
              </NavbarMenuItem>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" onClick={() => handleNavigation("/home/report/Scheduling")}>
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" onClick={() => handleNavigation("/home/report/CTP")}>
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" onClick={() => handleNavigation("/home/report/Editorial")}>
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" onClick={() => handleNavigation("/home/report/Prepress")}>
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" onClick={() => handleNavigation("/home/report/Machinestop")}>
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" onClick={() => handleNavigation("/home/report/Production")}>
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarMenuItem>
          <NavbarMenuItem>
            {/* <LogoutButton islarge={false} onClick={handleLogout}/> */}
            <Button onClick={handleLogout} size={ "md"} color="danger" href="#" variant="solid">
              Log out
            </Button>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      {showLogoutPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">Are you sure you want to log out?</p>
            <div className="flex justify-end space-x-4">
              <Button auto flat color="error" onClick={confirmLogout}>
                Logout
              </Button>
              <Button auto onClick={cancelLogout}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <Popup message={popupMessage} onClose={closePopup} buttonDisp={false} />
      )}
    </div>
  );
}

export default NewNav;

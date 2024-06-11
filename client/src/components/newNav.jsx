import React, { useState } from "react";
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
import LogoutButton from "./LogoutButoon";
import Logo from '../images/tmg-logo.jpg'; 
import Popup from './Popup';

function NewNav({ token, username }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const confirmLogout = () => {
    // Your logout logic here
    setPopupMessage("You have been logged out successfully.");
    setShowPopup(true);
    setShowLogoutPopup(false);
  };

  const cancelLogout = () => {
    setShowLogoutPopup(false);
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage(null);
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
        <NavbarContent className="hidden sm:flex gap-20" justify="center">
          <NavbarItem>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" color="primary" size="lg" className="text-black">
                  Entry
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" href="/home/entry/Scheduling">
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" href="/home/entry/CTP">
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" href="/home/entry/Editorial">
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" href="/home/entry/Prepress">
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" href="/home/entry/Machinestop">
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" href="/home/entry/Production">
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
          <NavbarItem isActive>
            <Link color="foreground" href="/home">
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
                <DropdownItem key="scheduling" href="/home/report/Scheduling">
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" href="/home/report/CTP">
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" href="/home/report/Editorial">
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" href="/home/report/Prepress">
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" href="/home/report/Machinestop">
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" href="/home/report/Production">
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
        {!isMenuOpen && (
          <NavbarContent className="hidden sm:flex" justify="end">
            <NavbarItem>
              <LogoutButton islarge={true} onClick={handleLogout}/>
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
                    className="text-black text-lg"
                  >
                    Entry
                  </Button>
                </DropdownTrigger>
              </NavbarMenuItem>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" href="/home/entry/Scheduling">
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" href="/home/entry/CTP">
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" href="/home/entry/Editorial">
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" href="/home/entry/Prepress">
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" href="/home/entry/Machinestop">
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" href="/home/entry/Production">
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button color="primary" variant="light">
              <Link
                color="foreground"
                href="/home"
                className="w-full text-center"
              >
                HOME
              </Link>
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Dropdown>
              <NavbarMenuItem>
                <DropdownTrigger>
                  <Button
                    variant="light"
                    color="primary"
                    className="text-black"
                  >
                    Report
                  </Button>
                </DropdownTrigger>
              </NavbarMenuItem>
              <DropdownMenu aria-label="Link Actions">
                <DropdownItem key="scheduling" href="/home/report/Scheduling">
                  Scheduling
                </DropdownItem>
                <DropdownItem key="ctp" href="/home/report/CTP">
                  CTP
                </DropdownItem>
                <DropdownItem key="editorial" href="/home/report/Editorial">
                  Editorial
                </DropdownItem>
                <DropdownItem key="prepress" href="/home/report/Prepress">
                  Prepress
                </DropdownItem>
                <DropdownItem key="machinestop" href="/home/report/Machinestop">
                  Machine stop
                </DropdownItem>
                <DropdownItem key="production" href="/home/report/Production">
                  Production
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <LogoutButton islarge={false} onClick={handleLogout}/>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
      {showLogoutPopup && (
        <Popup 
          message={
            <>
              Are you sure you want to logout?
              <div className="popup-buttons">
                <Button onClick={confirmLogout}>Yes</Button>
                <Button onClick={cancelLogout}>No</Button>
              </div>
            </>
          } 
          onClose={cancelLogout} 
        />
      )}
      {showPopup && (
        <Popup message={popupMessage} onClose={closePopup} duration={3000} />
      )}
    </div>
  );
}

export default NewNav;
